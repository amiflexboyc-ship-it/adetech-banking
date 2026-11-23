import express from 'express';
import db from '../config/db.js';

const router = express.Router();

/**
 * @route   POST /api/contact
 * @desc    Submit inquiry from website contact form
 * @access  Public
 */
router.post('/', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const inquiry = {
      id: `inq_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || 'N/A',
      subject: subject || 'general',
      message: message.trim(),
      forwardedTo: process.env.CONTACT_RECEIVER_EMAIL || 'amiflexboyc@gmail.com',
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };

    db.addInquiry(inquiry);

    return res.status(201).json({
      success: true,
      message: 'Inquiry received and routed to AdeTech customer operations desk.',
      inquiryReference: inquiry.id,
      routedTo: inquiry.forwardedTo
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error logging contact message.'
    });
  }
});

export default router;
