import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './config/db.js';
import { generateOTPWithExpiry, verifyOTP } from './utils/generateOTP.js';
import emailService from './services/emailService.js';

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'adetech_digital_banking_secure_jwt_secret_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const generateAccountNumber = () => {
  const randomPart = Math.floor(10000000 + Math.random() * 90000000);
  return `09${randomPart.toString().slice(0, 8)}`;
};

export const authController = {

  register: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full name, email address, and password are required.'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters in length.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = db.findUserByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { otp, expiresAt } = generateOTPWithExpiry(6, 10);

      const userId = `usr_${Date.now()}`;
      const newUser = {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone ? phone.trim() : '09077108987',
        password: hashedPassword,
        tier: 'Tier 1 (Standard Verification)',
        emailVerified: false,
        verificationOTP: otp,
        otpExpiresAt: expiresAt.toISOString(),
        transactionPin: null,
        bvnVerified: false,
        ninVerified: false,
        createdAt: new Date().toISOString()
      };

      db.addUser(newUser);

      const newAccount = {
        id: `acc_${Date.now()}`,
        userId: newUser.id,
        accountNumber: generateAccountNumber(),
        accountType: 'Personal Checking Account',
        currency: 'NGN',
        balance: 10000.00,
        ledgerBalance: 10000.00,
        dailyLimit: 1000000.00
      };

      db.addAccount(newAccount);

      db.addTransaction({
        id: `txn_${Date.now()}`,
        userId: newUser.id,
        type: 'credit',
        amount: 10000.00,
        currency: 'NGN',
        category: 'Welcome Credit',
        senderName: 'AdeTech Central Vault',
        reference: `ADT-WELCOME-${Date.now().toString().slice(-6)}`,
        status: 'completed',
        date: new Date().toISOString(),
        description: 'New Account Welcome Credit'
      });

      emailService.sendVerificationOTP(newUser.email, newUser.name, otp).catch((err) => {
        console.error('[Auth Controller] Error dispatching verification email:', err.message);
      });

      const token = generateToken(newUser.id);
      const { password: _, verificationOTP: __, ...safeUser } = newUser;

      return res.status(201).json({
        success: true,
        message: 'Account registered successfully. A 6-digit verification code has been dispatched to your email.',
        token,
        user: safeUser,
        account: newAccount
      });
    } catch (err) {
      console.error('[Auth Controller] Registration error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error processing customer registration.'
      });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: 'Both registered email and 6-digit verification code are required.'
        });
      }

      const user = db.findUserByEmail(email.trim().toLowerCase());
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found with the provided email address.'
        });
      }

      if (user.emailVerified) {
        return res.json({
          success: true,
          message: 'Email address is already verified. You can log in directly.'
        });
      }

      const verification = verifyOTP(otp, user.verificationOTP, user.otpExpiresAt);
      if (!verification.valid) {
        return res.status(400).json({
          success: false,
          message: verification.reason || 'Invalid or expired verification code.'
        });
      }

      db.updateUser(user.id, {
        emailVerified: true,
        verificationOTP: null,
        otpExpiresAt: null
      });

      const account = db.findAccountByUserId(user.id);

      emailService.sendWelcomeEmail(user.email, user.name, account?.accountNumber).catch((err) => {
        console.error('[Auth Controller] Error dispatching welcome email:', err.message);
      });

      return res.json({
        success: true,
        message: 'Email address verified successfully. Your AdeTech banking account is now fully active.'
      });
    } catch (err) {
      console.error('[Auth Controller] Email verification error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error processing email verification.'
      });
    }
  },

  resendVerificationOTP: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Registered email address is required.'
        });
      }

      const user = db.findUserByEmail(email.trim().toLowerCase());
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found with this email address.'
        });
      }

      if (user.emailVerified) {
        return res.json({
          success: true,
          message: 'This email is already verified. Please proceed to login.'
        });
      }

      const { otp, expiresAt } = generateOTPWithExpiry(6, 10);
      db.updateUser(user.id, {
        verificationOTP: otp,
        otpExpiresAt: expiresAt.toISOString()
      });

      await emailService.sendVerificationOTP(user.email, user.name, otp);

      return res.json({
        success: true,
        message: 'A fresh 6-digit verification code has been dispatched to your email.'
      });
    } catch (err) {
      console.error('[Auth Controller] Resend OTP error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error resending verification code.'
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide both email and password.'
        });
      }

      const user = db.findUserByEmail(email.trim().toLowerCase());
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.'
        });
      }

      const token = generateToken(user.id);
      const account = db.findAccountByUserId(user.id);
      const { password: _, verificationOTP: __, resetPasswordOTP: ___, ...safeUser } = user;

      return res.json({
        success: true,
        message: 'Authentication successful. Welcome to AdeTech Banking.',
        token,
        user: safeUser,
        account
      });
    } catch (err) {
      console.error('[Auth Controller] Login error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error processing authentication.'
      });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Please provide your registered email address.'
        });
      }

      const user = db.findUserByEmail(email.trim().toLowerCase());

      if (!user) {
        return res.json({
          success: true,
          message: 'If an account exists with this email, a password recovery code has been dispatched.'
        });
      }

      const { otp, expiresAt } = generateOTPWithExpiry(6, 10);
      db.updateUser(user.id, {
        resetPasswordOTP: otp,
        resetPasswordExpiresAt: expiresAt.toISOString()
      });

      await emailService.sendPasswordResetOTP(user.email, user.name, otp);

      return res.json({
        success: true,
        message: 'A password recovery code has been sent to your registered email address.'
      });
    } catch (err) {
      console.error('[Auth Controller] Forgot password error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error processing password recovery request.'
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Email, reset code, and new password are required.'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters in length.'
        });
      }

      const user = db.findUserByEmail(email.trim().toLowerCase());
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'No account found matching this email.'
        });
      }

      const verification = verifyOTP(otp, user.resetPasswordOTP, user.resetPasswordExpiresAt);
      if (!verification.valid) {
        return res.status(400).json({
          success: false,
          message: verification.reason || 'Invalid or expired password reset code.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      db.updateUser(user.id, {
        password: hashedPassword,
        resetPasswordOTP: null,
        resetPasswordExpiresAt: null
      });

      return res.json({
        success: true,
        message: 'Password reset successfully. You can now log in with your new password.'
      });
    } catch (err) {
      console.error('[Auth Controller] Reset password error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error resetting password.'
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password and new password are required.'
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters in length.'
        });
      }

      const user = db.findUserById(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Customer record not found.'
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'The current password entered is incorrect.'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      db.updateUser(user.id, { password: hashedPassword });

      return res.json({
        success: true,
        message: 'Password updated successfully.'
      });
    } catch (err) {
      console.error('[Auth Controller] Change password error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error updating password.'
      });
    }
  },

  setTransactionPin: async (req, res) => {
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
        message: 'Transaction PIN set successfully. You can now authorize transfers.'
      });
    } catch (err) {
      console.error('[Auth Controller] Set PIN error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error configuring transaction PIN.'
      });
    }
  },

  getMe: (req, res) => {
    try {
      const account = db.findAccountByUserId(req.user.id);
      const cards = db.getCardsByUserId(req.user.id);

      return res.json({
        success: true,
        user: req.user,
        account,
        cardCount: cards.length
      });
    } catch (err) {
      console.error('[Auth Controller] GetMe error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving customer profile.'
      });
    }
  },

  logout: (req, res) => {
    return res.json({
      success: true,
      message: 'Logged out securely. Session ended.'
    });
  }
};

export default authController;
