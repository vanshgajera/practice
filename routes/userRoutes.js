const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

// Create User
router.post('/', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phone').notEmpty().withMessage('Phone is required'),
], userController.createUser);

// Read Users
router.get('/', userController.getUsers);

// Update User
router.put('/:id', userController.updateUser);

// Soft Delete User
router.patch('/:id', userController.softDeleteUser);

// Multiple Delete Users
router.delete('/', userController.deleteUsers);

module.exports = router;
