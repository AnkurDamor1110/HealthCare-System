const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    email: {
        type : String,
        require : true
    },
    subject: {
        type : String,
        require : true
    },
    message: {
        type : String,
        require : true
    }
})

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;