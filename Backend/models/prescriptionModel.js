const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

// Prescription Schema
const PrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    prescribedMed: [
      {
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        dosage: {
          type: String,
        },
        qty: {
          type: Number,
        },
      },
    ],
    remarks: {
      type: String,
    },
    paid: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Precription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = Precription;
