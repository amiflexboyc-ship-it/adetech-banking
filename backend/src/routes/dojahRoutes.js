import express from 'express';
import dojahController from '../controllers/dojahController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Dojah Integration Status
 */
router.get('/status', protect, dojahController.getStatus);

/**
 * Bank Directory & CBN Code Lookup
 */
router.get('/banks', protect, dojahController.getBanks);
router.get('/bank-code', protect, dojahController.lookupBankCode);

/**
 * Bank Account Name Resolution (NUBAN Verification)
 */
router.get('/resolve/account', protect, dojahController.resolveAccount);
router.post('/resolve/account', protect, dojahController.resolveAccount);

/**
 * KYC Identity Verification: BVN, NIN & Phone
 */
router.get('/bvn', protect, dojahController.verifyBVN);
router.post('/bvn', protect, dojahController.verifyBVN);

router.get('/nin', protect, dojahController.verifyNIN);
router.post('/nin', protect, dojahController.verifyNIN);

router.get('/phone', protect, dojahController.verifyPhone);
router.post('/phone', protect, dojahController.verifyPhone);

export default router;
