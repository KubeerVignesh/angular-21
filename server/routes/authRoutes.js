const express = require('express');
const router = express.Router();
const { signup, login, getMe, updateDetails } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter, apiLimiter } = require('../middleware/rateLimiter');

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/me', protect, apiLimiter, getMe);
router.put('/updatedetails', protect, apiLimiter, updateDetails);

module.exports = router;
