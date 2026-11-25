import dojahService from '../services/dojahService.js';

export const dojahController = {

  getStatus: (req, res) => {
    return res.json({
      success: true,
      configured: dojahService.hasCredentials(),
      isTestMode: dojahService.isTestMode(),
      provider: 'Dojah KYC & Financial API',
      capabilities: [
        'account_resolution',
        'bank_directory',
        'bvn_verification',
        'nin_verification',
        'phone_verification'
      ]
    });
  },

  getBanks: async (req, res) => {
    try {
      const banks = await dojahService.getSupportedBanks();
      return res.json({
        success: true,
        count: banks.length,
        banks
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || 'Failed to retrieve banks from Dojah directory.'
      });
    }
  },

  resolveAccount: async (req, res) => {
    try {

      const accountNumber = req.query.account_number || req.query.accountNumber || req.body.account_number || req.body.accountNumber;
      let bankCode = req.query.bank_code || req.query.bankCode || req.body.bank_code || req.body.bankCode;
      const bankName = req.query.bank_name || req.query.bankName || req.query.recipientBank || req.body.bank_name || req.body.bankName || req.body.recipientBank;

      if (!accountNumber) {
        return res.status(400).json({
          success: false,
          message: 'Account number is required (10-digit NUBAN).'
        });
      }

      const cleanAcc = String(accountNumber).trim();
      if (!/^\d{10}$/.test(cleanAcc)) {
        return res.status(400).json({
          success: false,
          message: 'Account number must be exactly 10 numeric digits.'
        });
      }

      if (!bankCode && bankName) {
        bankCode = dojahService.getBankCode(bankName);
      }

      if (!bankCode) {
        return res.status(400).json({
          success: false,
          message: 'Destination bank code or a recognized bank name is required for account resolution.'
        });
      }

      const resolved = await dojahService.resolveAccountNumber(cleanAcc, bankCode);

      return res.json({
        success: true,
        accountName: resolved.accountName,
        accountNumber: resolved.accountNumber,
        bankCode: resolved.bankCode,
        bvn: resolved.bvn || null,
        verificationProvider: 'Dojah Verified'
      });
    } catch (err) {
      const statusCode = err.statusCode || (err.code === 'DOJAH_CREDENTIALS_MISSING' ? 503 : 400);
      return res.status(statusCode).json({
        success: false,
        code: err.code || 'DOJAH_RESOLUTION_ERROR',
        message: err.message || 'Account resolution failed via Dojah.'
      });
    }
  },

  verifyBVN: async (req, res) => {
    try {
      const bvn = req.query.bvn || req.body.bvn;

      if (!bvn) {
        return res.status(400).json({
          success: false,
          message: 'BVN is required (11 numeric digits).'
        });
      }

      const cleanBvn = String(bvn).trim();
      if (!/^\d{11}$/.test(cleanBvn)) {
        return res.status(400).json({
          success: false,
          message: 'BVN must be exactly 11 numeric digits.'
        });
      }

      const details = await dojahService.resolveBVN(cleanBvn);

      return res.json({
        success: true,
        data: details,
        verificationProvider: 'Dojah KYC'
      });
    } catch (err) {
      const statusCode = err.statusCode || (err.code === 'DOJAH_CREDENTIALS_MISSING' ? 503 : 400);
      return res.status(statusCode).json({
        success: false,
        code: err.code || 'DOJAH_BVN_ERROR',
        message: err.message || 'BVN verification failed via Dojah.'
      });
    }
  },

  verifyNIN: async (req, res) => {
    try {
      const nin = req.query.nin || req.body.nin;

      if (!nin) {
        return res.status(400).json({
          success: false,
          message: 'NIN is required (11 numeric digits).'
        });
      }

      const cleanNin = String(nin).trim();
      if (!/^\d{11}$/.test(cleanNin)) {
        return res.status(400).json({
          success: false,
          message: 'NIN must be exactly 11 numeric digits.'
        });
      }

      const details = await dojahService.resolveNIN(cleanNin);

      return res.json({
        success: true,
        data: details,
        verificationProvider: 'Dojah KYC'
      });
    } catch (err) {
      const statusCode = err.statusCode || (err.code === 'DOJAH_CREDENTIALS_MISSING' ? 503 : 400);
      return res.status(statusCode).json({
        success: false,
        code: err.code || 'DOJAH_NIN_ERROR',
        message: err.message || 'NIN verification failed via Dojah.'
      });
    }
  },

  verifyPhone: async (req, res) => {
    try {
      const phone = req.query.phone || req.query.phone_number || req.body.phone || req.body.phone_number;

      if (!phone) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is required.'
        });
      }

      const details = await dojahService.resolvePhoneNumber(phone);

      return res.json({
        success: true,
        data: details,
        verificationProvider: 'Dojah KYC'
      });
    } catch (err) {
      const statusCode = err.statusCode || (err.code === 'DOJAH_CREDENTIALS_MISSING' ? 503 : 400);
      return res.status(statusCode).json({
        success: false,
        code: err.code || 'DOJAH_PHONE_ERROR',
        message: err.message || 'Phone verification failed via Dojah.'
      });
    }
  },

  lookupBankCode: (req, res) => {
    const bankName = req.query.bank_name || req.query.name || req.query.bank;

    if (!bankName) {
      return res.status(400).json({
        success: false,
        message: 'bank_name query parameter is required.'
      });
    }

    const code = dojahService.getBankCode(bankName);
    if (!code) {
      return res.status(404).json({
        success: false,
        message: `No official CBN bank code found matching "${bankName}".`
      });
    }

    return res.json({
      success: true,
      bankName,
      bankCode: code,
      category: dojahService.categorizeBank(bankName)
    });
  }
};

export default dojahController;
