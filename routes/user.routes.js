const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js'); // Import middleware
const router = express.Router();

// Protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'You are authorized!',
    userId: req.user.id, // Extracted from JWT
  });
});

module.exports = router;
