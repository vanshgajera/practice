const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    image: { type: String },
    status: { type: Boolean, default: true },
    created_date: { type: String, default: () => new Date().toISOString() },
    updated_date: { type: String, default: () => new Date().toISOString() }
});

module.exports = mongoose.model('User', userSchema);
