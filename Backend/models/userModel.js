const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    seenNotifications: {
        type: Array,
        default: [],
    },
    unseenNotifications: {
        type: Array,
        default: [],
    },
    profilePicture: {
        url: {
            type: String,
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
