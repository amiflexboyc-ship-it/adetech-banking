import express from 'express';
import dojahController from '../controllers/dojahController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/status', protect, dojahController.getStatus);

router.get('/banks', protect, dojahController.getBanks);
router.get('/bank-code', protect, dojahController.lookupBankCode);

router.get('/resolve/account', protect, dojahController.resolveAccount);
router.post('/resolve/account', protect, dojahController.resolveAccount);

router.get('/bvn', protect, dojahController.verifyBVN);
router.post('/bvn', protect, dojahController.verifyBVN);

router.get('/nin', protect, dojahController.verifyNIN);
router.post('/nin', protect, dojahController.verifyNIN);

router.get('/phone', protect, dojahController.verifyPhone);
router.post('/phone', protect, dojahController.verifyPhone);

export default router;
