const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const Medicine = require("../models/medicineModel");
const Interview = require("../models/interviewModel");

router.get('/get-all-doctors',authMiddleware, async (req, res) => {
    try {
       const doctors = await Doctor.find({});
       res.status(200).send({ message: "Doctors fetched successfully", success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating ", success: false, error });
    }
});

router.get('/get-all-users',authMiddleware, async (req, res) => {
    try {
       const users = await User.find({});
       res.status(200).send({ message: "Users fetched successfully", success: true, data: users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating ", success: false, error });
    }
});

router.post('/schedule-interview', async (req, res) => {
    try {
        // Extract the required data from the request body
        const { doctorId, date, time, googleMeetLink } = req.body;

        // Create a new interview instance
        const interview = new Interview({
            doctorId,
            date,
            time,
            googleMeetLink
        });

        // Save the interview to the database
        await interview.save();
        const doctor = await Doctor.findById( {_id: doctorId});
        const user = await User.findById( {_id: doctor.userId });

      
        user.unseenNotifications.push({
        type: "new-doctor-request",
        message: `You get interview schedule for you doctor Profile click for more information! `,
        onclickPath: `/interview-details`
       });
       await user.save();
    
        // Respond with success message
        res.status(200).send({ success: true, message: 'Interview scheduled successfully.' });
    } catch (error) {
        console.error('Error scheduling interview:', error);
        // Respond with error message
        res.status(500).send({ success: false, message: 'Failed to schedule interview.' });
    }
});

router.post('/change-account-doctor-status',authMiddleware, async (req, res) => {
    try {
       const {doctorId, status} = req.body;
       const doctor = await Doctor.findByIdAndUpdate(doctorId, { status});

       const user = await User.findOne({_id: doctor.userId});
       const unseenNotifications = user.unseenNotifications;
       user.unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your Doctor Account has been ${status}`,
        onclickPath: "/notifications"
       });
       user.isDoctor = status === "approved" ? true: false;
       await user.save();
       
       res.status(200).send({ message: "Doctor status updated Successfully", success: true, data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Applying doctor Account ", success: false, error });
    }
});

router.get('/get-all-appointments',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find();
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-all-success-appointments',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find({ status: 'completed' });
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-all-pending-appointments',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find({ status: 'pending' });
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-all-approved-appointments',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find({ status: 'approved' });
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});
router.get('/get-all-rejected-appointments',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find({ status: 'rejected' });
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});


router.get('/get-all-medicines',authMiddleware, async (req, res) => {
    try {
       const medicines = await Medicine.find();
       console.log(medicines);
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: medicines });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

module.exports = router;