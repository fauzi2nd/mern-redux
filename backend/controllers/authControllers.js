'use strict';

const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await argon2.verify(user.password, password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

module.exports = {
    loginUser,
    getMe
}