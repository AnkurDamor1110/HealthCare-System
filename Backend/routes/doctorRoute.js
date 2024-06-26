const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const Appointment = require("../models/appointmentModel");
const TreatmentMeeting = require("../models/treatmentMeetingModel");
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

router.get('/get-success-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({doctorId: doctor._id , status: 'completed'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-padding-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({doctorId: doctor._id , status: 'padding'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-approved-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({doctorId: doctor._id , status: 'approved'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-rejected-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({doctorId: doctor._id , status: 'rejected'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-users-appointments-by-doctor-id',authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.body.userId });
       const users = await Appointment.distinct('userId', { doctorId: doctor._id });
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.post('/schedule-treatment-meeting', async (req, res) => {
    try {
        const { doctorId, userId, googleMeetLink, message, doctorInfo } = req.body;

        if (!doctorId || !userId || !googleMeetLink || !message) {
            return res.status(400).send({ message: "All fields are required", success: false });
        }

        const newMeeting = new TreatmentMeeting({
            doctorId,
            userId,
            doctorInfo,
            googleMeetLink,
            message,
        });
        console.log(newMeeting);
        await newMeeting.save();

        const user = await User.findById( {_id: userId });
        console.log(user);
        user.unseenNotifications.push({
        type: "new-doctor-request",
        message: `You get Treatment meeting Video link with doctor click for more information! `,
        onclickPath: `/treatment-meeting-details`
       });
       await user.save();
       console.log(user.unseenNotifications);

        res.status(200).send({ message: "Treatment meeting Video link sent successfully", success: true, data: newMeeting });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error scheduling treatment meeting", success: false, error });
    }
});

router.get('/get-treatment-meeting-details', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send({ message: "User ID is required", success: false });
        }

        const meetingDetails = await TreatmentMeeting.findOne({ userId }).populate('doctorId', 'name');

        if (!meetingDetails) {
            return res.status(404).send({ message: "No treatment meeting found", success: false });
        }

        res.status(200).send({ message: "Treatment meeting details fetched successfully", success: true, data: meetingDetails });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching treatment meeting details", success: false, error });
    }
});

module.exports = router;