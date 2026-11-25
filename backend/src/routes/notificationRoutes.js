import express from 'express';
import db from '../config/db.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
  const notifications = db.getNotificationsByUserId(req.user.id);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return res.json({
    success: true,
    unreadCount,
    notifications
  });
});

router.put('/read-all', protect, (req, res) => {
  db.markAllNotificationsRead(req.user.id);
  return res.json({
    success: true,
    message: 'All notifications marked as read.'
  });
});

export default router;
