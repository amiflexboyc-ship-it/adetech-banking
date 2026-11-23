import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import api from '../../api';

// Built-in Nigerian Bank Catalog fallback with Paystack CBN codes
const DEFAULT_BANKS = [
  { name: 'AdeTech Banking', code: '090', isInternal: true, category: 'Core Network' },
  { name: 'Paystack Sandbox Test Bank', code: '001', isTestBank: true, category: 'Sandbox / Test Bank (Unlimited)' },
  // Commercial Banks
  { name: 'Access Bank', code: '044', category: 'Commercial Bank' },
  { name: 'Citibank Nigeria', code: '023', category: 'Commercial Bank' },
  { name: 'Ecobank Nigeria', code: '050', category: 'Commercial Bank' },
  { name: 'Fidelity Bank', code: '070', category: 'Commercial Bank' },
  { name: 'First Bank of Nigeria', code: '011', category: 'Commercial Bank' },
  { name: 'First City Monument Bank (FCMB)', code: '214', category: 'Commercial Bank' },
  { name: 'Globus Bank', code: '00103', category: 'Commercial Bank' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '058', category: 'Commercial Bank' },
  { name: 'Heritage Bank', code: '030', category: 'Commercial Bank' },
  { name: 'Keystone Bank', code: '082', category: 'Commercial Bank' },
  { name: 'Nova Commercial Bank', code: '561', category: 'Commercial Bank' },
  { name: 'Optimus Bank', code: '107', category: 'Commercial Bank' },
  { name: 'Parallex Bank', code: '526', category: 'Commercial Bank' },
  { name: 'Polaris Bank', code: '076', category: 'Commercial Bank' },
  { name: 'Premium Trust Bank', code: '105', category: 'Commercial Bank' },
  { name: 'Providus Bank', code: '101', category: 'Commercial Bank' },
  { name: 'Signature Bank', code: '106', category: 'Commercial Bank' },
  { name: 'Stanbic IBTC Bank', code: '221', category: 'Commercial Bank' },
  { name: 'Standard Chartered Bank', code: '068', category: 'Commercial Bank' },
  { name: 'Sterling Bank', code: '232', category: 'Commercial Bank' },
  { name: 'SunTrust Bank', code: '100', category: 'Commercial Bank' },
  { name: 'Titan Trust Bank', code: '102', category: 'Commercial Bank' },
  { name: 'Union Bank of Nigeria', code: '032', category: 'Commercial Bank' },
  { name: 'United Bank for Africa (UBA)', code: '033', category: 'Commercial Bank' },
  { name: 'Unity Bank', code: '215', category: 'Commercial Bank' },
  { name: 'Wema Bank', code: '035', category: 'Commercial Bank' },
  { name: 'Zenith Bank', code: '057', category: 'Commercial Bank' },

  // Digital Banks & Fintechs
  { name: 'OPay Digital Services', code: '999992', category: 'Digital Bank / PSB' },
  { name: 'Palmpay Limited', code: '999991', category: 'Digital Bank / PSB' },
  { name: 'Moniepoint Microfinance Bank', code: '50515', category: 'Digital Bank / PSB' },
  { name: 'Kuda Microfinance Bank', code: '50211', category: 'Digital Bank / PSB' },
  { name: 'Carbon (One Finance)', code: '565', category: 'Digital Bank / PSB' },
  { name: 'FairMoney Microfinance Bank', code: '51318', category: 'Digital Bank / PSB' },
  { name: 'Chipper Cash', code: '840', category: 'Digital Bank / PSB' },
  { name: 'Gomoney', code: '100022', category: 'Digital Bank / PSB' },
  { name: 'PocketApp (PiggyVest)', code: '51253', category: 'Digital Bank / PSB' },
  { name: 'VFD Microfinance Bank (VBank)', code: '566', category: 'Digital Bank / PSB' },
  { name: 'Dot Microfinance Bank', code: '50163', category: 'Digital Bank / PSB' },
  { name: 'Raven Bank', code: '50931', category: 'Digital Bank / PSB' },
  { name: 'Mintyn Digital Bank', code: '50304', category: 'Digital Bank / PSB' },
  { name: 'Rubies Bank', code: '125', category: 'Digital Bank / PSB' },
  { name: 'Hope Payment Service Bank', code: '120002', category: 'Digital Bank / PSB' },
  { name: '9PSB (9 Payment Service Bank)', code: '120001', category: 'Digital Bank / PSB' },
  { name: 'MoMo Payment Service Bank', code: '120003', category: 'Digital Bank / PSB' },
  { name: 'Smartcash Payment Service Bank', code: '120004', category: 'Digital Bank / PSB' },

  // Non-Interest Banks
  { name: 'Jaiz Bank', code: '301', category: 'Non-Interest Bank' },
  { name: 'TAJBank', code: '302', category: 'Non-Interest Bank' },
  { name: 'Lotus Bank', code: '303', category: 'Non-Interest Bank' },
  { name: 'Alterna Bank', code: '304', category: 'Non-Interest Bank' },

  // Merchant Banks
  { name: 'Coronation Merchant Bank', code: '559', category: 'Merchant Bank' },
  { name: 'FBNQuest Merchant Bank', code: '560', category: 'Merchant Bank' },
  { name: 'FSDH Merchant Bank', code: '501', category: 'Merchant Bank' },
  { name: 'Greenwich Merchant Bank', code: '562', category: 'Merchant Bank' },
  { name: 'Rand Merchant Bank', code: '502', category: 'Merchant Bank' },

  // Microfinance & Mortgage Banks
  { name: 'Accion Microfinance Bank', code: '602', category: 'Microfinance & Mortgage' },
  { name: 'LAPO Microfinance Bank', code: '50400', category: 'Microfinance & Mortgage' },
  { name: 'Mutual Trust Microfinance Bank', code: '50563', category: 'Microfinance & Mortgage' },
  { name: 'Sparkle Microfinance Bank', code: '51310', category: 'Microfinance & Mortgage' },
  { name: 'Eyowo Microfinance Bank', code: '50126', category: 'Microfinance & Mortgage' },
  { name: 'Peace Microfinance Bank', code: '50743', category: 'Microfinance & Mortgage' },
  { name: 'Mainstreet Microfinance Bank', code: '50645', category: 'Microfinance & Mortgage' },
  { name: 'Infinity Trust Mortgage Bank', code: '070016', category: 'Microfinance & Mortgage' },
  { name: 'Abbey Mortgage Bank', code: '404', category: 'Microfinance & Mortgage' },
  { name: 'ASO Savings and Loans', code: '090001', category: 'Microfinance & Mortgage' },
  { name: 'Federal Mortgage Bank of Nigeria', code: '070001', category: 'Microfinance & Mortgage' },
  { name: 'Gateway Mortgage Bank', code: '070009', category: 'Microfinance & Mortgage' },
  { name: 'Platinum Mortgage Bank', code: '070013', category: 'Microfinance & Mortgage' }
];

function SendMoney() {
  const context = useOutletContext();
  const user = context?.user || {
    name: 'Adekunle Olawale',
    email: 'amiflexboyc@gmail.com',
    tier: 'Tier 3 (Unrestricted)',
    accountNumber: '0907710898',
    balance: 1450000.00
  };
  const setUser = context?.setUser;
  const navigate = useNavigate();

  // Current Wizard Stage: 1 = Beneficiary, 2 = Amount & Narration, 3 = Confirmation, 4 = PIN & OTP, 5 = Receipt
  const [currentStep, setCurrentStep] = useState(1);

  // Bank & Account State (Steps 1, 2, 3)
  const [supportedBanks, setSupportedBanks] = useState(DEFAULT_BANKS);
  const [recipientBank, setRecipientBank] = useState('AdeTech Banking');
  const [recipientBankCode, setRecipientBankCode] = useState('090');
  const [accountNumber, setAccountNumber] = useState('');
  const [verifiedBeneficiary, setVerifiedBeneficiary] = useState(null);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // Amount & Narration State (Steps 4, 5)
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');

  // Security & Authorization State (Steps 7, 8, 9)
  const [hasPin, setHasPin] = useState(true);
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [isCreatingPin, setIsCreatingPin] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDestination, setOtpDestination] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [devOtp, setDevOtp] = useState('');

  // Processing & Errors
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptToast, setReceiptToast] = useState('');

  // Completed Receipt (Step 10)
  const [receipt, setReceipt] = useState(null);

  // Idempotency token to prevent duplicate double-spend submissions
  const idempotencyKeyRef = useRef(`IDEMP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  // Calculate dynamic fees: ₦0.00 for AdeTech, ₦10.75 for inter-bank
  const isInternalTransfer = recipientBank === 'AdeTech Banking' || recipientBankCode === '090';
  const transactionFee = isInternalTransfer ? 0.00 : 10.75;
  const numericAmount = parseFloat(amount) || 0;
  const totalDebitAmount = numericAmount + transactionFee;
  const availableBalance = Number(user?.balance ?? 1450000);

  // Load supported banks from backend Paystack directory
  useEffect(() => {
    let isMounted = true;
    api.transactions
      .getSupportedBanks()
      .then((res) => {
        if (isMounted && res && Array.isArray(res.banks) && res.banks.length > 0) {
          setSupportedBanks(res.banks);
        }
      })
      .catch(() => {
        // Fall back to DEFAULT_BANKS
      });

    // Check customer PIN status on load
    api.transactions
      .getPinStatus()
      .then((res) => {
        if (isMounted && res) {
          setHasPin(Boolean(res.hasPin));
          setIsCreatingPin(!res.hasPin);
        }
      })
      .catch(() => {
        if (isMounted) setHasPin(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // OTP Countdown Timer
  useEffect(() => {
    let timerId;
    if (otpSent && otpCountdown > 0) {
      timerId = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    } else if (otpCountdown === 0) {
      setCanResendOtp(true);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [otpSent, otpCountdown]);

  // ---------------------------------------------------------------------------
  // STEP 2 & 3: Account Number Input & Automated Verification
  // ---------------------------------------------------------------------------
  const handleAccountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(val);
    setVerifiedBeneficiary(null);
    setVerificationError('');
    setErrorMessage('');

    // Trigger backend verification as soon as exactly 10 numeric digits are entered
    if (val.length === 10) {
      performAccountVerification(val, recipientBank, recipientBankCode);
    }
  };

  const handleBankChange = (e) => {
    const selectedName = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const code = selectedOption?.getAttribute('data-code') || '';

    setRecipientBank(selectedName);
    setRecipientBankCode(code);
    setVerifiedBeneficiary(null);
    setVerificationError('');
    setErrorMessage('');

    if (accountNumber.length === 10) {
      performAccountVerification(accountNumber, selectedName, code);
    }
  };

  const performAccountVerification = async (accNum, bank, code) => {
    setVerifyingAccount(true);
    setVerificationError('');
    setErrorMessage('');

    try {
      const res = await api.transactions.verifyAccount(accNum, bank, code || recipientBankCode);
      if (res && res.success) {
        setVerifiedBeneficiary(res);
      } else {
        setVerificationError(res?.message || 'Beneficiary account could not be resolved at destination bank.');
      }
    } catch (err) {
      setVerificationError(
        err.message || 'Beneficiary account verification failed. Account could not be resolved.'
      );
    } finally {
      setVerifyingAccount(false);
    }
  };

  const handleSelectTestBank = () => {
    const acc = accountNumber.length === 10 ? accountNumber : '0001234567';
    setAccountNumber(acc);
    setRecipientBank('Paystack Sandbox Test Bank');
    setRecipientBankCode('001');
    performAccountVerification(acc, 'Paystack Sandbox Test Bank', '001');
  };

  const handleSelectAdeTechBank = () => {
    setRecipientBank('AdeTech Banking');
    setRecipientBankCode('090');
    setAccountNumber('0907710898');
    performAccountVerification('0907710898', 'AdeTech Banking', '090');
  };

  // Continue to Step 4 (Amount)
  const handleProceedToAmount = (e) => {
    e.preventDefault();
    if (!verifiedBeneficiary) {
      setErrorMessage('Please enter a valid 10-digit NUBAN account number and verify the actual beneficiary name before proceeding.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  // ---------------------------------------------------------------------------
  // STEP 4 & 5: Transfer Amount & Narration Validation
  // ---------------------------------------------------------------------------
  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(val);
    setErrorMessage('');
  };

  const handleQuickAmount = (val) => {
    setAmount(String(val));
    setErrorMessage('');
  };

  const handleProceedToReview = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!numericAmount || numericAmount <= 0) {
      setErrorMessage('Please enter a valid transfer amount greater than zero.');
      return;
    }

    if (numericAmount < 100) {
      setErrorMessage('Minimum transfer amount is ₦100.00.');
      return;
    }

    if (totalDebitAmount > availableBalance) {
      setErrorMessage(
        `Insufficient funds. Total required is ₦${totalDebitAmount.toLocaleString('en-NG', {
          minimumFractionDigits: 2
        })} (including ₦${transactionFee.toFixed(2)} clearing fee). Your available balance is ₦${availableBalance.toLocaleString('en-NG', {
          minimumFractionDigits: 2
        })}.`
      );
      return;
    }

    setCurrentStep(3);
  };

  // ---------------------------------------------------------------------------
  // STEP 6: Review & Trigger Step 7/8 Security Authorization
  // ---------------------------------------------------------------------------
  const handleProceedToAuthorization = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      // Dispatch Transfer Authorization OTP via Backend API
      const otpRes = await api.transactions.sendTransferOTP({
        amount: numericAmount,
        recipientName: verifiedBeneficiary?.accountName || 'Beneficiary',
        recipientBank
      });

      if (otpRes && otpRes.success) {
        setOtpSent(true);
        setOtpDestination(otpRes.destinationEmail || 'your registered email');
        setOtpCountdown(60);
        setCanResendOtp(false);
        if (otpRes.devOtp) {
          setDevOtp(otpRes.devOtp);
        }
      }
      setCurrentStep(4);
    } catch (err) {
      setErrorMessage(err.message || 'Error dispatching transfer authorization code.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    if (!canResendOtp) return;

    if (resendCount >= 3) {
      setErrorMessage('Maximum authorization code resend limit reached. Please restart transfer.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.transactions.sendTransferOTP({
        amount: numericAmount,
        recipientName: verifiedBeneficiary?.accountName || 'Beneficiary',
        recipientBank
      });
      if (res && res.success) {
        setOtpCountdown(60);
        setCanResendOtp(false);
        setResendCount((prev) => prev + 1);
        setOtp(['', '', '', '', '', '']);
        if (res.devOtp) {
          setDevOtp(res.devOtp);
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error resending authorization code.');
    } finally {
      setLoading(false);
    }
  };

  // OTP Input Boxes
  const handleOtpDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`transfer-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`transfer-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // ---------------------------------------------------------------------------
  // STEP 9: Final Process Transfer
  // ---------------------------------------------------------------------------
  const handleFinalSubmitTransfer = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // If customer is creating a PIN on first transfer
    if (isCreatingPin) {
      if (!/^\d{4}$/.test(pin)) {
        setErrorMessage('Transaction PIN must be exactly 4 numeric digits.');
        return;
      }
      if (pin !== pinConfirm) {
        setErrorMessage('PIN confirmation does not match. Please re-enter.');
        return;
      }
      try {
        await api.transactions.setPin(pin);
        setHasPin(true);
        setIsCreatingPin(false);
      } catch (err) {
        setErrorMessage(err.message || 'Failed to configure transaction PIN.');
        return;
      }
    } else {
      if (!/^\d{4}$/.test(pin)) {
        setErrorMessage('Please enter your valid 4-digit transaction PIN.');
        return;
      }
    }

    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit transfer authorization code.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.transactions.transfer({
        recipientAccountNumber: accountNumber,
        recipientBank,
        recipientName: verifiedBeneficiary?.accountName || 'Beneficiary',
        amount: numericAmount,
        narration: narration || 'AdeTech Instant Transfer',
        pin,
        otp: fullOtp,
        idempotencyKey: idempotencyKeyRef.current
      });

      if (response && response.success) {
        // Update user state ONLY after confirmed successful processing
        if (response.newBalance !== undefined && setUser) {
          setUser((prev) => ({ ...prev, balance: response.newBalance }));
        }

        setReceipt(response.transaction);
        setCurrentStep(5);
      } else {
        setErrorMessage(response?.message || 'Transfer could not be processed. Balance has not been debited.');
      }
    } catch (err) {
      // On failure, customer's balance is NEVER reduced
      setErrorMessage(
        err.message || 'Transfer failed on settlement rail. Your account balance remains unchanged.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // STEP 10: Receipt Actions (Download & Share)
  // ---------------------------------------------------------------------------
  const handleDownloadReceipt = () => {
    if (!receipt) return;

    const receiptContent = `
============================================================
              ADETECH DIGITAL BANKING PLC
           OFFICIAL TRANSACTION SETTLEMENT RECEIPT
============================================================

TRANSACTION STATUS     : SUCCESSFUL / COMPLETED
TRANSACTION REFERENCE  : ${receipt.reference}
PAYMENT CHANNEL        : ${receipt.channel || (isInternalTransfer ? 'AdeTech Core Ledger' : 'Paystack Electronic Settlement Rail')}
DATE & TIME            : ${new Date(receipt.date).toUTCString()}

BENEFICIARY DETAILS:
Account Name           : ${receipt.recipientName}
Destination Bank       : ${receipt.recipientBank}
NUBAN Account Number   : ${receipt.recipientAccountNumber}

TRANSACTION SUMMARY:
Principal Amount       : NGN ${Number(receipt.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
Transaction Fee        : NGN ${Number(receipt.fee || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
Total Debited          : NGN ${Number(receipt.totalDebited || receipt.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}

NARRATION / PURPOSE    : ${receipt.description || 'Electronic Funds Transfer'}

SENDER DETAILS:
Account Holder         : ${user?.name || 'AdeTech Customer'}
Debit Account          : ${user?.accountNumber || '0907710898'}
Remaining Balance      : NGN ${Number(user?.balance ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}

============================================================
All electronic transfers are cleared in compliance with
Central Bank of Nigeria (CBN) electronic payment mandates.
Support Desk: amiflexboyc@gmail.com | 09077108987
============================================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AdeTech-Receipt-${receipt.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareReceipt = async () => {
    if (!receipt) return;

    const summaryText = `AdeTech Bank Transfer Receipt\nRef: ${receipt.reference}\nAmount: ₦${Number(receipt.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}\nTo: ${receipt.recipientName} (${receipt.recipientBank})\nDate: ${new Date(receipt.date).toLocaleDateString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AdeTech Bank Transfer Receipt',
          text: summaryText
        });
      } catch {
        copyReceiptToClipboard(summaryText);
      }
    } else {
      copyReceiptToClipboard(summaryText);
    }
  };

  const copyReceiptToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setReceiptToast('Receipt summary copied to clipboard.');
      setTimeout(() => setReceiptToast(''), 3000);
    }
  };

  const resetToStepOne = () => {
    setCurrentStep(1);
    setAccountNumber('');
    setVerifiedBeneficiary(null);
    setAmount('');
    setNarration('');
    setPin('');
    setPinConfirm('');
    setOtp(['', '', '', '', '', '']);
    setOtpSent(false);
    setReceipt(null);
    setErrorMessage('');
    idempotencyKeyRef.current = `IDEMP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Header & Real-time Balance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-blue-900/50 gap-2">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Instant Money Transfer</h1>
          <p className="text-xs text-slate-300 mt-0.5">Secure, multi-step inter-bank settlement via Paystack & AdeTech Core Banking.</p>
        </div>
        <div className="sm:text-right">
          <div className="text-[11px] text-slate-400">Available Checking Balance</div>
          <div className="font-mono text-base font-bold text-emerald-400">
            ₦{availableBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* 5-Stage Step Progress Indicator */}
      {currentStep < 5 && (
        <div className="p-4 rounded-2xl bg-[#0a1d36] border border-blue-900/60 shadow-lg">
          <div className="flex items-center justify-between relative">
            
            {/* Step 1 Indicator */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 1
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                    : currentStep > 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#071527] text-slate-400 border border-blue-900'
                }`}
              >
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${currentStep === 1 ? 'text-cyan-400' : 'text-slate-400'}`}>
                Beneficiary
              </span>
            </div>

            {/* Connecting Line 1 */}
            <div className={`flex-1 h-0.5 mx-1 transition-colors ${currentStep > 1 ? 'bg-emerald-600' : 'bg-blue-950'}`} />

            {/* Step 2 Indicator */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 2
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                    : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#071527] text-slate-400 border border-blue-900'
                }`}
              >
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${currentStep === 2 ? 'text-cyan-400' : 'text-slate-400'}`}>
                Amount
              </span>
            </div>

            {/* Connecting Line 2 */}
            <div className={`flex-1 h-0.5 mx-1 transition-colors ${currentStep > 2 ? 'bg-emerald-600' : 'bg-blue-950'}`} />

            {/* Step 3 Indicator */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 3
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                    : currentStep > 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#071527] text-slate-400 border border-blue-900'
                }`}
              >
                {currentStep > 3 ? '✓' : '3'}
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${currentStep === 3 ? 'text-cyan-400' : 'text-slate-400'}`}>
                Review
              </span>
            </div>

            {/* Connecting Line 3 */}
            <div className={`flex-1 h-0.5 mx-1 transition-colors ${currentStep > 3 ? 'bg-emerald-600' : 'bg-blue-950'}`} />

            {/* Step 4 Indicator */}
            <div className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === 4
                    ? 'bg-blue-600 text-white ring-4 ring-blue-500/20'
                    : 'bg-[#071527] text-slate-400 border border-blue-900'
                }`}
              >
                4
              </div>
              <span className={`text-[10px] mt-1 font-semibold ${currentStep === 4 ? 'text-cyan-400' : 'text-slate-400'}`}>
                Security
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
        </div>
      )}

      {/* Toast Notification */}
      {receiptToast && (
        <div className="p-3 rounded-xl bg-blue-900 border border-blue-400/50 text-white text-xs text-center animate-in fade-in">
          {receiptToast}
        </div>
      )}

      {/* =======================================================================
          STAGE 1: BENEFICIARY SELECTION (STEPS 1, 2, 3)
         ======================================================================= */}
      {currentStep === 1 && (
        <form onSubmit={handleProceedToAmount} className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-6 animate-in fade-in">
          
          <div className="flex items-center gap-2 pb-3 border-b border-blue-900/40 text-sm font-bold text-white">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">
              1
            </span>
            <span>Select Destination Bank & Account</span>
          </div>

          {/* STEP 1: Destination Bank Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Destination Bank</label>
              <span className="text-[11px] text-cyan-400 font-medium">
                {supportedBanks.length > 50 ? `${supportedBanks.length}+ Banks Available (Paystack API)` : 'Nigerian Banks'}
              </span>
            </div>

            <select
              value={recipientBank}
              onChange={handleBankChange}
              className="w-full px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <optgroup label="AdeTech Core Network">
                <option value="AdeTech Banking" data-code="090">
                  AdeTech Banking (Zero Fee Instant Internal)
                </option>
              </optgroup>

              <optgroup label="Sandbox / Test Banks (Unlimited Testing)">
                <option value="Paystack Sandbox Test Bank" data-code="001">
                  Paystack Sandbox Test Bank (Unlimited Testing - Code 001)
                </option>
              </optgroup>

              <optgroup label="Commercial Banks (CBN Licensed)">
                {supportedBanks
                  .filter((b) => b.category === 'Commercial Bank')
                  .map((b) => (
                    <option key={b.code} value={b.name} data-code={b.code}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Digital Neobanks, PSBs & Fintechs">
                {supportedBanks
                  .filter((b) => b.category === 'Digital Bank / PSB')
                  .map((b) => (
                    <option key={b.code} value={b.name} data-code={b.code}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Non-Interest & Islamic Banks">
                {supportedBanks
                  .filter((b) => b.category === 'Non-Interest Bank')
                  .map((b) => (
                    <option key={b.code} value={b.name} data-code={b.code}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Merchant Banks">
                {supportedBanks
                  .filter((b) => b.category === 'Merchant Bank')
                  .map((b) => (
                    <option key={b.code} value={b.name} data-code={b.code}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>

              <optgroup label="Microfinance & Mortgage Banks">
                {supportedBanks
                  .filter((b) => b.category === 'Microfinance & Mortgage')
                  .map((b) => (
                    <option key={b.code} value={b.name} data-code={b.code}>
                      {b.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>

          {/* STEP 2: Account Number Entry */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">10-Digit NUBAN Account Number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 0907710898"
                value={accountNumber}
                onChange={handleAccountChange}
                maxLength={10}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-sm tracking-widest focus:outline-none focus:border-blue-500"
              />
              {verifyingAccount && (
                <div className="absolute right-3.5 top-3.5 flex items-center gap-1.5 text-xs text-blue-400">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-[11px] font-semibold">Resolving via Paystack...</span>
                </div>
              )}
            </div>

            {/* STEP 3: Automated Real Account Verification Display */}
            {verifiedBeneficiary && (
              <div className="space-y-2 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                        Verified Beneficiary Name
                      </div>
                      <div className="text-xs font-bold text-white tracking-wide">
                        {verifiedBeneficiary.accountName}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-900/80 text-emerald-300 border border-emerald-700/60">
                      {verifiedBeneficiary.verificationProvider || (verifiedBeneficiary.isInternal ? 'AdeTech Core Ledger' : 'Paystack Verified')}
                    </span>
                  </div>
                </div>

                {verifiedBeneficiary.isTestModeLimit && (
                  <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-200 text-[11px] leading-relaxed">
                    <strong className="text-cyan-300">Paystack Test Mode Notice:</strong> The daily limit of 3 live commercial bank resolves has been reached on this test key. Beneficiary was verified via Paystack Sandbox Code 001. For unlimited live lookups across all commercial banks, update to a live Paystack key (<code className="text-white bg-blue-900/60 px-1 py-0.5 rounded">sk_live_...</code>) in <code className="text-white bg-blue-900/60 px-1 py-0.5 rounded">backend/.env</code>.
                  </div>
                )}
              </div>
            )}

            {/* Meaningful Verification Error Guidance */}
            {verificationError && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/40 text-rose-300 text-xs flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="leading-relaxed">{verificationError}</span>
                </div>

                {/* Interactive Test Limit Resolution Helper */}
                {(verificationError.includes('limit of 3 live bank resolves') ||
                  verificationError.includes('001') ||
                  verificationError.includes('PAYSTACK_TEST_LIMIT_EXCEEDED') ||
                  verificationError.includes('daily limit')) && (
                  <div className="p-4 rounded-xl bg-[#071527] border border-amber-500/40 text-slate-300 text-xs space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Paystack Test Key Daily Limit Reached</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      Paystack restricts test keys (<code className="text-amber-300">sk_test_...</code>) to a maximum of 3 live commercial bank resolves per day. Choose one of the options below to continue testing:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleSelectTestBank}
                        className="p-2.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 border border-blue-500/40 text-left text-[11px] text-white transition-colors cursor-pointer"
                      >
                        <div className="font-semibold text-cyan-300">Option 1: Paystack Sandbox Bank</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Use official Test Bank Code 001 (unlimited resolves)</div>
                      </button>

                      <button
                        type="button"
                        onClick={handleSelectAdeTechBank}
                        className="p-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-left text-[11px] text-white transition-colors cursor-pointer"
                      >
                        <div className="font-semibold text-emerald-300">Option 2: AdeTech Internal Bank</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Test real account 0907710898 (₦0.00 fee)</div>
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-blue-950">
                      To resolve real live customer accounts across all Nigerian commercial banks, replace your secret key in <code className="text-white">backend/.env</code> with your Paystack live key (<code className="text-amber-300">sk_live_...</code>).
                    </div>
                  </div>
                )}

                {verificationError.includes('PAYSTACK_SECRET_KEY') && (
                  <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-slate-300 text-xs space-y-2">
                    <div className="text-cyan-400 font-bold text-xs">How to enable external bank account verification:</div>
                    <p className="text-[11px] leading-relaxed">
                      1. Retrieve your Paystack API Secret Key from <strong className="text-white">dashboard.paystack.com</strong> (Settings &rarr; API Keys).<br />
                      2. Paste it into <strong className="text-cyan-300">backend/.env</strong> as <code className="text-white bg-blue-900/60 px-1 py-0.5 rounded">PAYSTACK_SECRET_KEY=sk_test_...</code>.<br />
                      3. For instant testing without external API keys, select <strong className="text-white">AdeTech Banking</strong> with account number <code className="text-white bg-blue-900/60 px-1 py-0.5 rounded">0907710898</code> to resolve from the real database with zero fee.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!verifiedBeneficiary || verifyingAccount}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue to Transfer Amount</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </form>
      )}

      {/* =======================================================================
          STAGE 2: AMOUNT & NARRATION (STEPS 4, 5)
         ======================================================================= */}
      {currentStep === 2 && (
        <form onSubmit={handleProceedToReview} className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-6 animate-in fade-in">
          
          <div className="flex items-center gap-2 pb-3 border-b border-blue-900/40 text-sm font-bold text-white">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">
              2
            </span>
            <span>Specify Transfer Amount & Narration</span>
          </div>

          {/* Beneficiary Badge */}
          <div className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 flex items-center justify-between text-xs">
            <div>
              <div className="text-[11px] text-slate-400">Paying Beneficiary</div>
              <div className="font-bold text-white mt-0.5">{verifiedBeneficiary?.accountName}</div>
              <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                {accountNumber} • {recipientBank}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              Change
            </button>
          </div>

          {/* STEP 4: Transfer Amount Entry */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Transfer Amount (NGN)</label>
              <span className="text-[11px] text-slate-400">
                Min: ₦100.00 | Fee: {isInternalTransfer ? '₦0.00 (AdeTech)' : '₦10.75 (Inter-Bank)'}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-base">₦</span>
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-base tracking-wider focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quick Amount Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[5000, 10000, 20000, 50000, 100000].map((pillVal) => (
                <button
                  key={pillVal}
                  type="button"
                  onClick={() => handleQuickAmount(pillVal)}
                  className="px-2.5 py-1 rounded-lg bg-[#071527] border border-blue-900/70 hover:border-blue-500 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  +₦{pillVal.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 5: Payment Narration */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Payment Description / Narration (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Contract settlement, family upkeep, invoice"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-1/3 py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/70 text-slate-300 font-bold text-xs transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!numericAmount || numericAmount <= 0}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span>Review Transfer Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </form>
      )}

      {/* =======================================================================
          STAGE 3: CONFIRM TRANSFER REVIEW (STEP 6)
         ======================================================================= */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-6 animate-in fade-in">
          
          <div className="flex items-center gap-2 pb-3 border-b border-blue-900/40 text-sm font-bold text-white">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">
              3
            </span>
            <span>Confirm Transfer Summary</span>
          </div>

          {/* Detailed Review Table */}
          <div className="p-5 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-3.5 text-xs">
            
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Beneficiary Name</span>
              <span className="font-bold text-white text-sm">{verifiedBeneficiary?.accountName}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Destination Bank</span>
              <span className="font-semibold text-slate-200">{recipientBank}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Account Number</span>
              <span className="font-mono font-bold text-cyan-400 tracking-wider">{accountNumber}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Transfer Amount</span>
              <span className="font-mono text-base font-bold text-white">
                ₦{numericAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Clearing & Settlement Fee</span>
              <span className="font-mono text-xs font-semibold text-slate-300">
                {transactionFee === 0 ? '₦0.00 (Zero Fee)' : `₦${transactionFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <span className="text-slate-400">Narration</span>
              <span className="text-slate-200 italic">{narration || 'AdeTech Instant Transfer'}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-slate-300">Total Debited Amount</span>
              <span className="font-mono text-lg font-extrabold text-cyan-400">
                ₦{totalDebitAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

          </div>

          {/* Security Guarantee Notice */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-slate-300 flex items-start gap-2.5">
            <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>
              All inter-bank transactions are cleared via Paystack and AdeTech banking rails. Funds will be debited only upon cryptographic PIN and OTP confirmation.
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-1/3 py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/70 text-slate-300 font-bold text-xs transition-colors"
            >
              Edit Amount
            </button>
            <button
              type="button"
              onClick={handleProceedToAuthorization}
              disabled={loading}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Generating Authorization Code...</span>
              ) : (
                <>
                  <span>Proceed to Security Authorization</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* =======================================================================
          STAGE 4: SECURITY AUTHORIZATION (STEPS 7, 8, 9)
         ======================================================================= */}
      {currentStep === 4 && (
        <form onSubmit={handleFinalSubmitTransfer} className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-6 animate-in fade-in">
          
          <div className="flex items-center gap-2 pb-3 border-b border-blue-900/40 text-sm font-bold text-white">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs">
              4
            </span>
            <span>Security Verification & Authorization</span>
          </div>

          {/* Amount Badge */}
          <div className="text-center p-4 rounded-2xl bg-[#071527] border border-blue-900/60">
            <div className="text-xs text-slate-400">Authorizing Settlement Of</div>
            <div className="font-mono text-2xl font-extrabold text-cyan-400 mt-1">
              ₦{numericAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              To: <strong className="text-white">{verifiedBeneficiary?.accountName}</strong> ({accountNumber} - {recipientBank})
            </div>
          </div>

          {/* STEP 7: 4-Digit Transaction PIN Entry */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                {isCreatingPin ? 'Create 4-Digit Transaction PIN' : 'Enter 4-Digit Transaction PIN'}
              </label>
              <span className="text-[11px] text-slate-400">Default PIN: <strong className="text-cyan-300 font-mono">1234</strong></span>
            </div>

            <div className="relative">
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                required
                className="w-full text-center px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-xl tracking-[12px] focus:outline-none focus:border-blue-500"
              />
            </div>

            {isCreatingPin && (
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-300">Confirm 4-Digit Transaction PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  value={pinConfirm}
                  onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  required
                  className="w-full text-center px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-xl tracking-[12px] focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* STEP 8: OTP Verification Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">6-Digit One-Time Password (OTP)</label>
              <span className="text-[11px] text-cyan-400">Sent to {otpDestination || 'your email'}</span>
            </div>

            {/* 6-Segment OTP Input Boxes */}
            <div className="flex justify-between gap-2 max-w-sm mx-auto py-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  id={`transfer-otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  required
                  className="w-11 h-12 text-center text-lg font-mono font-bold text-cyan-300 bg-[#071527] border border-blue-900/70 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              ))}
            </div>

            {/* OTP Expiration & Resend */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">
                {otpCountdown > 0 ? (
                  <>Code expires in <strong className="text-slate-200">{otpCountdown}s</strong></>
                ) : (
                  <span className="text-amber-400">Authorization code expired</span>
                )}
              </span>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResendOtp || loading}
                className="text-xs font-semibold text-blue-400 hover:text-cyan-300 hover:underline disabled:opacity-40 disabled:no-underline"
              >
                Resend Code {resendCount > 0 ? `(${resendCount}/3)` : ''}
              </button>
            </div>

            {/* Development Mode Authorization Code Box */}
            {devOtp && (
              <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-500/40 text-xs text-blue-200 flex items-center justify-between animate-in fade-in">
                <span>Authorization Code: <strong className="text-white font-mono tracking-widest text-sm">{devOtp}</strong></span>
                <button
                  type="button"
                  onClick={() => setOtp(devOtp.split('').slice(0, 6))}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Auto-fill Code
                </button>
              </div>
            )}
          </div>

          {/* STEP 9: Action & Submit Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              disabled={loading}
              className="w-1/3 py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/70 text-slate-300 font-bold text-xs transition-colors disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading || otp.join('').length < 6 || pin.length < 4}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Settling via Payment Rail...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Authorize & Complete Transfer</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

      {/* =======================================================================
          STAGE 5: TRANSACTION RECEIPT (STEP 10)
         ======================================================================= */}
      {currentStep === 5 && receipt && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36] border border-emerald-500/50 shadow-2xl space-y-6 animate-in fade-in">
          
          {/* Green Successful Transaction Indicator */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-950/90 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-white">Transfer Successful</h2>
            <p className="text-xs text-slate-300">
              Funds have been transferred and settled electronically.
            </p>
          </div>

          {/* Amount Hero */}
          <div className="text-center py-3 bg-[#071527] rounded-2xl border border-blue-900/60">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Amount Transferred</div>
            <div className="font-mono text-3xl font-extrabold text-emerald-400 mt-1">
              ₦{Number(receipt.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* Detailed Receipt Breakdown */}
          <div className="p-5 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-3 text-xs">
            
            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Recipient Name</span>
              <span className="font-bold text-white text-right">{receipt.recipientName}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Recipient Bank</span>
              <span className="font-semibold text-slate-200">{receipt.recipientBank}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Recipient Account Number</span>
              <span className="font-mono font-bold text-cyan-400">{receipt.recipientAccountNumber}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Transaction Reference</span>
              <span className="font-mono text-cyan-300 font-semibold">{receipt.reference}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Transaction Date & Time</span>
              <span className="text-slate-200">{new Date(receipt.date).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Transaction Fee</span>
              <span className="font-mono text-slate-200">
                ₦{Number(receipt.fee || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Payment Channel</span>
              <span className="text-slate-200">{receipt.channel || (isInternalTransfer ? 'AdeTech Core Ledger' : 'Paystack Electronic Settlement Rail')}</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400 font-semibold">New Account Balance</span>
              <span className="font-mono font-bold text-base text-white">
                ₦{Number(user?.balance ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

          </div>

          {/* Action Buttons: Download Receipt & Share Receipt */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-800/80 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Receipt</span>
            </button>

            <button
              type="button"
              onClick={handleShareReceipt}
              className="py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-800/80 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share Receipt</span>
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={resetToStepOne}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-colors"
            >
              Make Another Transfer
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/60 text-slate-300 hover:text-white font-bold text-xs transition-colors"
            >
              Dashboard
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default SendMoney;
