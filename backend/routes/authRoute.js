'use strict';

const express = require('express');
const {
    loginUser,
    getMe,
} = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;