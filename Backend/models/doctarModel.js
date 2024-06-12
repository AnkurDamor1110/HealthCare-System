const mongoose = require('mongoose');

const doctorShema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        feesPerConsultation: {
            type: Number,
            required: true,
        },
       timings: {
            type: Array,
            required: true,
       },
       status: {
            type: String,
            default: "pending",
       },
       photo:{
           type: String,
       },
       resume:{
        type: String,
       },

    },
        {
            timestamps: true,
        }
);

const doctorModel = mongoose.model("doctors", doctorShema);

module.exports = doctorModel;