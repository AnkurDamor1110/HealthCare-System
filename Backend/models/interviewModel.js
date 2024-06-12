const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    googleMeetLink: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
