const Contact = require("../models/contactModel");

const contactForm = async (req, res) => {
    console.log(req.body);
    try{
        const contact = new Contact({
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });

        console.log(contact);
        await contact.save();
        // console.log(contact.save());
        return res.status(200).json({ message: "message send successfully" });

    }catch(error){
        return res.status(500).json({ message: "message not delivered" });
    }
};

module.exports = contactForm;