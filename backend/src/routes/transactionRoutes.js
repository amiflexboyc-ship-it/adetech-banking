import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';
import { generateOTPWithExpiry, verifyOTP } from '../utils/generateOTP.js';
import emailService from '../services/emailService.js';
import paystackService from '../services/paystackService.js';
import dojahService from '../services/dojahService.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
  const transactions = db.getTransactionsByUserId(req.user.id);
  return res.json({
    success: true,
    count: transactions.length,
    transactions
  });
});

router.get('/supported-banks', protect, async (req, res) => {
  try {
    const banks = await paystackService.getSupportedBanks();
    return res.json({
      success: true,
      count: banks.length,
      banks
    });
  } catch (err) {
    console.error('Error fetching supported banks:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve Nigerian banks directory.'
    });
  }
});

router.post('/verify-account', protect, async (req, res) => {
  try {
    const { accountNumber, recipientBank, bankCode } = req.body;

    if (!accountNumber || !/^\d{10}$/.test(String(accountNumber).trim())) {
      return res.status(400).json({
        success: false,
        message: 'Account number must be a valid 10-digit NUBAN number.'
      });
    }

    const cleanAccount = String(accountNumber).trim();
    const cleanBank = String(recipientBank || 'AdeTech Banking').trim();

    if (/^(\d)\1{9}$/.test(cleanAccount)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account number. Repeated sequences are not valid NUBAN accounts.'
      });
    }

    if (cleanBank === 'AdeTech Banking' || bankCode === '090') {
      const internalAcc = db.findAccountByNumber(cleanAccount);
      if (!internalAcc) {
        return res.status(404).json({
          success: false,
          message: 'Account number does not exist on AdeTech Banking ledger.'
        });
      }

      const internalUser = db.findUserById(internalAcc.userId);
      if (!internalUser) {
        return res.status(404).json({
          success: false,
          message: 'Beneficiary account profile not found on AdeTech Banking ledger.'
        });
      }

      return res.json({
        success: true,
        accountName: internalUser.name.toUpperCase(),
        accountNumber: cleanAccount,
        bankName: 'AdeTech Banking',
        bankCode: '090',
        isInternal: true,
        fee: 0.00,
        verificationProvider: 'AdeTech Core Ledger'
      });
    }

    const targetCode = bankCode || paystackService.getBankCode(cleanBank) || dojahService.getBankCode(cleanBank);
    if (!targetCode) {
      return res.status(400).json({
        success: false,
        message: `Selected bank "${cleanBank}" is not supported for automated account resolution.`
      });
    }

    let resolved = null;
    let providerName = 'Paystack Bank Resolution';

    if (paystackService.hasSecretKey()) {
      try {
        resolved = await paystackService.resolveAccountNumber(cleanAccount, targetCode);
        providerName = resolved.isTestModeLimit ? 'Paystack Sandbox (Code 001)' : 'Paystack Bank Resolution';
      } catch (paystackErr) {

        if (dojahService.hasCredentials()) {
          const dojahResolved = await dojahService.resolveAccountNumber(cleanAccount, targetCode);
          resolved = dojahResolved;
          providerName = 'Dojah Verified';
        } else {
          throw paystackErr;
        }
      }
    } else if (dojahService.hasCredentials()) {
      resolved = await dojahService.resolveAccountNumber(cleanAccount, targetCode);
      providerName = 'Dojah Verified';
    } else {
      const error = new Error(
        'Real-time bank verification requires a configured PAYSTACK_SECRET_KEY or DOJAH credentials in backend/.env. Please configure your payment provider secret key.'
      );
      error.code = 'PAYSTACK_KEY_MISSING';
      throw error;
    }

    return res.json({
      success: true,
      accountName: resolved.accountName,
      accountNumber: resolved.accountNumber,
      bankName: cleanBank,
      bankCode: targetCode,
      isInternal: false,
      fee: 10.75,
      isTestModeLimit: Boolean(resolved.isTestModeLimit),
      verificationProvider: providerName
    });
  } catch (err) {
    if (err.code === 'PAYSTACK_TEST_LIMIT_EXCEEDED') {
      return res.status(429).json({
        success: false,
        code: 'PAYSTACK_TEST_LIMIT_EXCEEDED',
        message: err.message
      });
    }

    if (err.code === 'PAYSTACK_KEY_MISSING' || err.code === 'DOJAH_CREDENTIALS_MISSING') {
      return res.status(503).json({
        success: false,
        code: err.code,
        message: err.message
      });
    }

    if (err.code === 'PAYSTACK_AUTH_FAILED' || err.code === 'DOJAH_AUTH_FAILED') {
      return res.status(401).json({
        success: false,
        code: err.code,
        message: err.message
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || 'Beneficiary account could not be resolved at destination bank.'
    });
  }
});

router.get('/pin-status', protect, (req, res) => {
  const user = db.findUserById(req.user.id);
  const hasPin = Boolean(user && user.transactionPin);

  return res.json({
    success: true,
    hasPin
  });
});

router.post('/set-pin', protect, async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin || !/^\d{4}$/.test(String(pin).trim())) {
      return res.status(400).json({
        success: false,
        message: 'Transaction PIN must be exactly 4 numeric digits.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(String(pin).trim(), salt);

    db.updateUser(req.user.id, { transactionPin: hashedPin });

    return res.json({
      success: true,
      message: 'Transaction PIN configured successfully.'
    });
  } catch (err) {
    console.error('Set PIN error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error configuring transaction PIN.'
    });
  }
});

router.post('/verify-pin', protect, async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin || !/^\d{4}$/.test(String(pin).trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your 4-digit transaction PIN.'
      });
    }

    const user = db.findUserById(req.user.id);
    if (!user || !user.transactionPin) {
      return res.status(400).json({
        success: false,
        hasPin: false,
        message: 'You have not configured a transaction PIN yet. Please create one.'
      });
    }

    const isMatch = await bcrypt.compare(String(pin).trim(), user.transactionPin);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect transaction PIN. Please try again.'
      });
    }

    return res.json({
      success: true,
      message: 'Transaction PIN verified successfully.'
    });
  } catch (err) {
    console.error('Verify PIN error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error validating transaction PIN.'
    });
  }
});

router.post('/send-otp', protect, async (req, res) => {
  try {
    const { amount, recipientName, recipientBank } = req.body;
    const user = db.findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer account not found.' });
    }

    if (user.lastTransferOTPSentAt) {
      const elapsedSeconds = (Date.now() - user.lastTransferOTPSentAt) / 1000;
      if (elapsedSeconds < 45) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${Math.ceil(45 - elapsedSeconds)}s before requesting a new authorization code.`
        });
      }
    }

    const { otp, expiresAt } = generateOTPWithExpiry(6, 10);

    db.updateUser(user.id, {
      transferOTP: otp,
      transferOTPExpiresAt: expiresAt.toISOString(),
      lastTransferOTPSentAt: Date.now()
    });

    await emailService.sendTransferOTP(
      user.email,
      user.name,
      otp,
      amount || 0,
      recipientName || 'Beneficiary'
    );

    const maskedEmail = user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

    return res.json({
      success: true,
      message: `A 6-digit transfer authorization code has been dispatched to ${maskedEmail}.`,
      expiresAt: expiresAt.toISOString(),
      destinationEmail: maskedEmail,
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (err) {
    console.error('Send transfer OTP error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error dispatching transfer authorization code.'
    });
  }
});

router.post('/transfer', protect, async (req, res) => {
  try {
    const {
      recipientAccountNumber,
      recipientBank = 'AdeTech Banking',
      recipientName,
      amount,
      narration,
      pin,
      otp,
      idempotencyKey
    } = req.body;

    const transferAmount = parseFloat(amount);

    if (!recipientAccountNumber || !transferAmount || transferAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid recipient account number and positive amount are required.'
      });
    }

    if (!/^\d{10}$/.test(String(recipientAccountNumber).trim())) {
      return res.status(400).json({
        success: false,
        message: 'NUBAN account number must be exactly 10 digits.'
      });
    }

    const cleanAccount = String(recipientAccountNumber).trim();
    const user = db.findUserById(req.user.id);
    const senderAccount = db.findAccountByUserId(req.user.id);

    if (!user || !senderAccount) {
      return res.status(404).json({
        success: false,
        message: 'Sender account record not found.'
      });
    }

    if (idempotencyKey) {
      const existingTxn = db.getTransactionsByUserId(req.user.id).find((t) => t.idempotencyKey === idempotencyKey);
      if (existingTxn) {
        return res.json({
          success: true,
          message: 'Transaction already completed.',
          transaction: existingTxn,
          newBalance: senderAccount.balance
        });
      }
    }

    const isInternal = recipientBank === 'AdeTech Banking';
    const transactionFee = isInternal ? 0.00 : 10.75;
    const totalRequired = transferAmount + transactionFee;

    if (senderAccount.balance < totalRequired) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Transfer requires ₦${totalRequired.toLocaleString('en-NG', { minimumFractionDigits: 2 })} (including ₦${transactionFee.toFixed(2)} clearing fee). Available: ₦${senderAccount.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}.`
      });
    }

    if (!pin || !/^\d{4}$/.test(String(pin).trim())) {
      return res.status(400).json({
        success: false,
        message: '4-digit transaction PIN is required to authorize transfer.'
      });
    }

    if (!user.transactionPin) {
      return res.status(400).json({
        success: false,
        hasPin: false,
        message: 'Please set your 4-digit transaction PIN before transferring funds.'
      });
    }

    const pinMatch = await bcrypt.compare(String(pin).trim(), user.transactionPin);
    if (!pinMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect 4-digit transaction PIN. Balance has not been debited.'
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: '6-digit authorization code is required. Please request an OTP.'
      });
    }

    const otpVerification = verifyOTP(otp, user.transferOTP, user.transferOTPExpiresAt);
    if (!otpVerification.valid) {
      return res.status(400).json({
        success: false,
        message: `${otpVerification.reason || 'Invalid or expired authorization code.'} Balance has not been debited.`
      });
    }

    const newSenderBalance = senderAccount.balance - totalRequired;
    db.updateAccountBalance(senderAccount.id, newSenderBalance);

    const reference = `ADT-TX-${Date.now().toString().slice(-8)}`;
    const finalBeneficiaryName = recipientName || (isInternal ? 'AdeTech Customer' : 'Verified Beneficiary');

    if (isInternal) {
      const recipientAccount = db.findAccountByNumber(cleanAccount);
      if (recipientAccount) {
        const newRecipientBalance = recipientAccount.balance + transferAmount;
        db.updateAccountBalance(recipientAccount.id, newRecipientBalance);

        db.addTransaction({
          id: `txn_${Date.now()}_cr`,
          userId: recipientAccount.userId,
          type: 'credit',
          amount: transferAmount,
          fee: 0.00,
          currency: 'NGN',
          category: 'Inward Wire Transfer',
          senderName: user.name,
          reference,
          status: 'completed',
          date: new Date().toISOString(),
          description: narration || `Transfer from ${user.name}`
        });
      }
    }

    const senderTxn = {
      id: `txn_${Date.now()}_db`,
      userId: user.id,
      type: 'debit',
      amount: transferAmount,
      fee: transactionFee,
      totalDebited: totalRequired,
      currency: 'NGN',
      category: isInternal ? 'Internal Transfer' : 'Inter-Bank Transfer',
      recipientName: finalBeneficiaryName,
      recipientBank,
      recipientAccountNumber: cleanAccount,
      reference,
      status: 'completed',
      date: new Date().toISOString(),
      description: narration || `Transfer to ${finalBeneficiaryName}`,
      channel: isInternal ? 'AdeTech Core Ledger' : 'Paystack Electronic Settlement Rail',
      idempotencyKey: idempotencyKey || null
    };

    db.addTransaction(senderTxn);

    db.updateUser(user.id, {
      transferOTP: null,
      transferOTPExpiresAt: null
    });

    emailService.sendTransactionAlert(user.email, user.name, senderTxn).catch((err) => {
      console.error('Error dispatching transaction alert email:', err.message);
    });

    return res.status(200).json({
      success: true,
      message: `Transfer of ₦${transferAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })} completed successfully.`,
      transaction: senderTxn,
      newBalance: newSenderBalance
    });
  } catch (err) {
    console.error('Transfer processing error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing transfer. Your account balance remains unchanged.'
    });
  }
});

router.post('/pay-bill', protect, (req, res) => {
  try {
    const { biller, customerId, amount, billType } = req.body;
    const billAmount = parseFloat(amount);

    if (!biller || !billAmount || billAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid biller name and payment amount required.'
      });
    }

    const senderAccount = db.findAccountByUserId(req.user.id);
    if (!senderAccount || senderAccount.balance < billAmount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance to settle this bill.'
      });
    }

    const newBalance = senderAccount.balance - billAmount;
    db.updateAccountBalance(senderAccount.id, newBalance);

    const billTxn = {
      id: `txn_${Date.now()}_bill`,
      userId: req.user.id,
      type: 'debit',
      amount: billAmount,
      currency: 'NGN',
      category: billType || 'Bill Settlement',
      recipientName: biller,
      reference: `ADT-BILL-${Date.now().toString().slice(-8)}`,
      status: 'completed',
      date: new Date().toISOString(),
      description: `Payment for ${biller} (Ref: ${customerId || 'N/A'})`
    };

    db.addTransaction(billTxn);

    return res.json({
      success: true,
      message: `Bill payment of ₦${billAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })} to ${biller} successful.`,
      transaction: billTxn,
      newBalance
    });
  } catch (err) {
    console.error('Bill payment error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error processing bill payment.'
    });
  }
});

export default router;
