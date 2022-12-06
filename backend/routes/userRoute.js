'use strict';

const express = require('express');
const {
    createUser,
    deleteUserById,
    getUserById,
    getUsers,
    updateUserById
} = require('../controllers/userController.js');
const { validateUnique } = require('../middleware/validateMiddleware.js');

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(validateUnique, createUser);
router.route('/:id')
    .get(getUserById)
    .patch(validateUnique, updateUserById)
    .delete(deleteUserById);

module.exports = router;
