const { validationResult } = require('express-validator');
const User = require('../models/user');

// Create User
exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, image } = req.body;
    const user = new User({ name, email, phone, image });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Read Users with Pagination and Search
exports.getUsers = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = {
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } }
        ],
        status: true
    };

    try {
        const users = await User.find(query)
            .limit(Number(limit))
            .skip((page - 1) * limit);

        const count = await User.countDocuments(query);
        res.json({ users, total: count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const { name, email, phone, image } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            image,
            updated_date: new Date().toISOString()
        }, { new: true });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Soft Delete User
exports.softDeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Multiple Delete Users
exports.deleteUsers = async (req, res) => {
    const { ids } = req.body; // Expecting an array of IDs
    try {
        await User.updateMany({ _id: { $in: ids } }, { status: false });
        res.json({ message: 'Users soft deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
