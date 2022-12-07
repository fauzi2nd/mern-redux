'use strict';

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Create users
// @route   Post /api/users/
// @acces   Private
const createUser = asyncHandler(async (req, res) => {
    const { password, confPassword } = req.body;

    if (typeof (password) !== 'string') {
        res.status(400);
        throw new Error(`Passwords cannot use ${typeof (password)}.`);
    }

    if (password.length < 8) {
        res.status(400);
        throw new Error('The password must have at least 8 characters');
    }

    if (password !== confPassword) {
        res.status(400);
        throw new Error('Password and Confirm Password are not the same.');
    }

    const user = await User.create(req.body);
    if (user) {
        res.status(201).json("User create successfully");
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc    Get users
// @route   GET /api/users/
// @acces   Private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select({
        password: 0,
    });
    res.status(200).json(users);
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @acces   Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select({
        password: 0,
    });
    res.status(200).json(user);
})

// @desc    Update user by id
// @route   PATCH /api/users/:id
// @acces   Private
const updateUserById = asyncHandler(async (req, res) => {
    const { password, confPassword } = req.body;

    const oldUser = await User.findById(req.params.id);

    if (password === "" || password === null) {
        req.body.password = oldUser.password;
    } else {
        if (typeof (password) !== 'string') {
            res.status(400);
            throw new Error(`Passwords cannot use ${typeof (password)}.`);
        }

        if (password.length < 8) {
            res.status(400);
            throw new Error('The password must have at least 8 characters.');
        }

        if (password !== confPassword) {
            res.status(400);
            throw new Error('Password and Confirm Password are not the same.');
        }
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true })
        .select('-password');
    res.status(200).json(updatedUser);
})

// @desc    Delete user by id
// @route   DELETE /api/users/:id
// @acces   Private
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const deletedUserById = await User.deleteOne({
        _id: req.params.id,
    });
    
    if(deletedUserById) {
        res.status(200).json("Delete user successfully");
    } 
})

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
}