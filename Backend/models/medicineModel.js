const mongoose = require("mongoose");

// Medicine Schema
const MedicineSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide medicine cost"],
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;
