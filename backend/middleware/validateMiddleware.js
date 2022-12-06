'use strict'

const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const validateUnique = asyncHandler(async (req, res, next) => {

    const check = [
        { name: 'Name', object: req.body.name },
        { name: 'Email', object: req.body.email },
        { name: 'Username', object: req.body.username },
        { name: 'Password', object: req.body.password },
        { name: 'Confirm Password', object: req.body.confPassword },
        { name: 'Gender', object: req.body.gender },
        { name: 'Phone', object: req.body.phone },
        { name: 'Roles', object: req.body.roles }
    ];

    if (Object.keys(req.body).length === 0) {
        res.status(400);
        throw new Error(`Content cannot be empty.`);
    }

    check.forEach(c => {
        if (!c.object) {
            res.status(400);
            throw new Error(`${c.name} is required.`);
        }
    });

    const { email, username, phone } = req.body;
    const id = Object.keys(req.params).length !== 0 ? req.params.id : null;

    const oldUser = await User.findById(id);

    const emailIsUnique = await User.findOne({ email }).select({ _id: 1 });
    const usernameIsUnique = await User.findOne({ username }).select({ _id: 1 });
    const phoneIsUnique = await User.findOne({ phone }).select({ _id: 1 });

    const arr = [
        { name: 'Email', object: emailIsUnique },
        { name: 'Username', object: usernameIsUnique },
        { name: 'Phone', object: phoneIsUnique }
    ];

    // Check for create email, username, phone is unique
    if (!oldUser) {
        arr.forEach(a => {
            if (!!a.object) {
                res.status(400);
                throw new Error(`${a.name} is already exist.`);
            }
        })
    }

    // Check for update email, username, phone is unique
    if (!!oldUser) {
        arr.forEach(a => {
            if (!!a.object && !a.object._id.equals(oldUser._id)) {
                res.status(400);
                throw new Error(`${a.name} is already exist.`);
            }
        });
    }

    next();
})

module.exports = {
    validateUnique
}