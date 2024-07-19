const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email is not valid",
        },
        required: [true, "Email is required"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
