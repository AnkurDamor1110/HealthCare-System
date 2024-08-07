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
        type: String,
        // required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
    },
    verifytoken:{
        type: String,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
