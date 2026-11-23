import express from 'express';
import authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Public Authentication & Recovery Endpoints
 */
router.post('/register', authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-otp', authController.resendVerificationOTP);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

/**
 * Protected Session Endpoints
 */
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);

export default router;
