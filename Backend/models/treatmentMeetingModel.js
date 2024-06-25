const mongoose = require('mongoose');

const treatmentMeetingSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    doctorInfo: {
        type: Object,
        required: true,
    },
    googleMeetLink: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const TreatmentMeeting = mongoose.model('TreatmentMeeting', treatmentMeetingSchema);

module.exports = TreatmentMeeting;
