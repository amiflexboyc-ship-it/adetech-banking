import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/account/details
 * @desc    Get account balance and details
 * @access  Private
 */
router.get('/details', protect, (req, res) => {
  const account = db.findAccountByUserId(req.user.id);
  if (!account) {
    return res.status(404).json({
      success: false,
      message: 'Banking account not found for this user.'
    });
  }

  return res.json({
    success: true,
    account
  });
});

/**
 * @route   GET /api/account/cards
 * @desc    Get user's virtual and physical cards
 * @access  Private
 */
router.get('/cards', protect, (req, res) => {
  const cards = db.getCardsByUserId(req.user.id);
  return res.json({
    success: true,
    cards
  });
});

/**
 * @route   POST /api/account/cards/create
 * @desc    Generate an instant virtual card
 * @access  Private
 */
router.post('/cards/create', protect, (req, res) => {
  try {
    const { currency = 'USD', brand = 'Visa', spendingLimit = 1000 } = req.body;
    const randomLast4 = Math.floor(1000 + Math.random() * 9000);

    const newCard = {
      id: `crd_${Date.now()}`,
      userId: req.user.id,
      type: 'virtual',
      brand,
      currency,
      cardHolder: req.user.name.toUpperCase(),
      cardNumber: `${brand === 'Visa' ? '4532' : '5399'} •••• •••• ${randomLast4}`,
      expiry: '12/29',
      status: 'active',
      spendingLimit: parseFloat(spendingLimit) || 1000.00,
      billingAddress: 'AdeTech Tower, Lekki Phase 1, Lagos'
    };

    db.addCard(newCard);

    // Create card creation notification
    db.addTransaction({
      id: `txn_${Date.now()}`,
      userId: req.user.id,
      type: 'debit',
      amount: currency === 'USD' ? 2500 : 1000,
      currency: 'NGN',
      category: 'Card Issuance Fee',
      recipientName: 'AdeTech Card Services',
      reference: `ADT-CRD-${Date.now().toString().slice(-6)}`,
      status: 'completed',
      date: new Date().toISOString(),
      description: `Virtual ${currency} ${brand} Card Provisioning`
    });

    return res.status(201).json({
      success: true,
      message: `Virtual ${currency} ${brand} card generated successfully.`,
      card: newCard
    });
  } catch (err) {
    console.error('Card creation error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error generating virtual card.'
    });
  }
});

export default router;
