import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Get user notifications
 * @access  Private
 */
router.get('/', protect, (req, res) => {
  const notifications = db.getNotificationsByUserId(req.user.id);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return res.json({
    success: true,
    unreadCount,
    notifications
  });
});

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all user notifications as read
 * @access  Private
 */
router.put('/read-all', protect, (req, res) => {
  db.markAllNotificationsRead(req.user.id);
  return res.json({
    success: true,
    message: 'All notifications marked as read.'
  });
});

export default router;
