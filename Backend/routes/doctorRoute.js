const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/get-doctor-info-by-user-id', authMiddleware, async(req,res) =>{
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });
       
        console.log(doctor);
        res.status(200).send({ success: true, message: " Doctor info fetched successfully" , data: doctor,});
       console.log(doctor);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting Doctor info", success: false, error });
    }
});

router.post('/update-doctor-profile', authMiddleware, async(req,res) =>{
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId } , req.body);
       
        res.status(200).send({ success: true, message: " Doctor Profile update successfully" , data: doctor,});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting Doctor info", success: false, error });
    }
});


module.exports = router;