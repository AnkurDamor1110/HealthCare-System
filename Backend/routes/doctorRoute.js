const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const Appointment = require("../models/appointmentModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/get-doctor-info-by-user-id', authMiddleware, async(req,res) =>{
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });

        res.status(200).send({ success: true, message: " Doctor info fetched successfully" , data: doctor,});

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting Doctor info", success: false, error });
    }
});

router.post('/get-doctor-info-by-id', authMiddleware, async(req,res) =>{
    try {
        const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    
        res.status(200).send({ success: true, message: " Doctor info fetched successfully" , data: doctor,});

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

router.get('/get-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId});
       const appointments = await Appointment.find({doctorId: doctor._id});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.post('/change-appointment-status',authMiddleware, async (req, res) => {
    try {
       const {appointmentId, status , userInfo} = req.body;
       const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status});

       const user = await User.findOne({_id: appointment.userId});
       user.unseenNotifications.push({
        type: "Appointment-status-changed",
        message: `Your Appointment status has been ${status}`,
        onclickPath: "/appointments"
       });
       await user.save();
       
       res.status(200).send({ message: "Appointment status updated Successfully", success: true,});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error changing Appointment status ", success: false, error });
    }
});



module.exports = router;