const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const Appointment = require("../models/appointmentModel");
const Interview = require('../models/interviewModel');
const Review =  require("../models/reviewModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const moment = require('moment');

const multer = require('multer');
const { storage } = require('../config/cloudConfig');
const upload = multer({ storage: storage });


router.post('/register',upload.single('profilePicture'), async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        console.log(req.body.email);
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }

           // Check if a file was uploaded
        let profilePicture = null;
        if (req.file) {
            const url = req.file.path;
            // const filename = req.file.filename;
            profilePicture =  url ;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            profilePicture: profilePicture, // Assign the profile picture
        });

        await newUser.save();
        res.status(200).send({ message: "User created successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating user", success: false, error });
    }
});

router.post('/login', async(req,res) =>{
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            return res.status(200).send({ message: "Login successful", success: true, data: token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });
    }
});

router.post('/get-user-info-by-id', authMiddleware, async(req,res) =>{
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: "User does not exist", success: false });
        } else {
            res.status(200).send({ success: true,  data: user});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error getting user info", success: false, error });
    }
});

router.post('/apply-doctor-account', authMiddleware, async (req, res) => {
    try {
        console.log(req.body);
       const newDoctor = new Doctor({...req.body, status : "pending"});
       await newDoctor.save();
       const adminUser = await User.findOne({isAdmin: true});

       const unseenNotifications = adminUser.unseenNotifications;
       adminUser.unseenNotifications.push({
        type: "new-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
        data:{
            doctordId : newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName
        },
        onclickPath: "/admin/doctorslist"
       });
       await User.findByIdAndUpdate(adminUser._id,{unseenNotifications });
       res.status(200).send({ message: "Doctor account created successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error applying doctor account", success: false, error });
    }
});

router.post('/mark-all-notification-as-seen', authMiddleware, async (req, res) => {
    try {
       const user = await User.findOne({_id: req.body.userId});
       const unseenNotifications = user.unseenNotifications;
       const seenNotifications = user.seenNotifications;
       seenNotifications.push(...unseenNotifications);
       user.unseenNotifications=[];
       user.seenNotifications = seenNotifications;
       const updatedUser = await user.save();
       updatedUser.password=undefined;
       res.status(200).send({ message: "All Notification marked as Seen", success: true, data: updatedUser });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error to seen Notification", success: false, error });
    }
});

router.post('/delete-all-notification', authMiddleware, async (req, res) => {
    try {
       const user = await User.findOne({_id: req.body.userId});
       user.seenNotifications=[];
       user.unseenNotifications=[];
       const updatedUser = await user.save();
       updatedUser.password=undefined;
       res.status(200).send({ message: "All Notification cleared", success: true, data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Deleteing Notification", success: false, error });
    }
});

router.get('/get-all-approved-doctors',authMiddleware, async (req, res) => {
    try {
       const doctors = await Doctor.find({ status: "approved"});
       res.status(200).send({ message: "Doctors fetched successfully", success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating ", success: false, error });
    }
});

router.post('/book-appointment',authMiddleware, async (req, res) => {
    try {
       req.body.status = "pending";
       req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
       req.body.time = moment(req.body.time, 'HH:mm').toISOString();
       const newAppointment = new Appointment(req.body);
       await newAppointment.save();

       //pushing notification to doctor based on his userId
       const user = await User.findOne({_id: req.body.doctorInfo.userId});
       user.unseenNotifications.push({
        type: "new-appointment-request",
        message: `A new appointment request has been made by ${req.body.userInfo.name}`,
        onclickPath: '/doctor/appointments',
       });
       await user.save();
       res.status(200).send({ message: "Appointment booked successfully ", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error booking Appointment ", success: false, error });
    }
});

router.post('/check-booking-avilability',authMiddleware, async (req, res) => {
    try {
      
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointment = await Appointment.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: toTime },
            // status: ''
        });
        if( appointment.length > 0){
           return  res.status(200).send({
             message: "Appointment not available ", 
             success: false });

        }else{
            return res.status(200).send({ 
                message: "Appointment available ",
                 success: true });

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error booking Appointment ", success: false, error });
    }
});

router.get('/get-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
       const appointments = await Appointment.find({userId: req.body.userId});
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-user-info-by-user-id', async (req, res) => {
    try {
       const user = await User.find({userId: req.body.userId});
       res.status(200).send({ message: "Appointments fetched successfully", success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.post('/update-user-profile', upload.single('profilePicture'), authMiddleware, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.body.userId } , req.body);
        res.status(200).send({ success: true, message: " User Profile update successfully" , data: user,});
    } catch (error) {
      console.error('Error updating profile:', error); // Log error to the console for debugging
      res.status(500).send({ message: "Error updating user profile", success: false, error });
    }
  });

  router.get('/interview-details', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is available in req.user

        // Find the doctor based on the userId
        const doctor = await Doctor.findOne({ userId });

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found.' });
        }
        const interviewDetails = await Interview.findOne({ doctorId: doctor._id });

        if (interviewDetails) {
            res.status(200).json({ success: true, interviewDetails });
        } else {
            res.status(404).json({ success: false, message: 'Interview details not found.' });
        }
    } catch (error) {
        console.error('Error fetching interview details:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch interview details.' });
    }
});

router.post('/submit-review', async (req, res) => {
    try {
    
        
        const { doctorId, userId, userInfo, rating, comment } = req.body;
        const review = new Review({
            doctorId,
            userId,
            userInfo,
            rating,
            comment
        });

        await review.save();
        console.log(review);
        res.status(200).json({ success: true, message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit review', error });
    }
});


router.get('/get-reviews-by-doctor-id',async (req, res) => {
    try {
    
        const { doctorId } = req.query; 
        console.log(doctorId);

        const review = await Review.find({ doctorId  });
        console.log(review);
        res.status(200).json({ success: true, message: 'Review fetching successfully', review });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetching review', error });
    }
});

router.get('/get-reviews-rating', async (req, res) => {
    try {
        const { doctorId } = req.query;  // Change from req.body to req.query to handle GET request parameters
        console.log(doctorId);

        const reviews = await Review.find({ doctorId });

        if (reviews.length === 0) {
            return res.status(200).json({ success: true, message: 'No reviews found', averageRating: 0 });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        console.log(averageRating);

        res.status(200).json({ success: true, message: 'Review fetched successfully', averageRating });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch review', error });
    }
});


router.get('/get-user-doctors-by-user-id', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).send({ message: "User ID is required", success: false });
        }
        const doctorIds = await Appointment.distinct('doctorId', { userId: userId });
        const doctors = await Doctor.find({ _id: { $in: doctorIds } });
        res.status(200).send({ message: "User's Doctors fetched successfully", success: true, data: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching user's doctors", success: false, error });
    }
});

router.get('/get-success-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
        // const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({userId: req.body.userId , status: 'completed'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});
router.get('/get-panding-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
        // const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({userId: req.body.userId , status: 'panding'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-approved-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
        // const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({userId: req.body.userId , status: 'approved'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});
router.get('/get-rejected-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
        // const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({userId: req.body.userId  , status: 'rejected'});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-appointments-by-user-id',authMiddleware, async (req, res) => {
    try {
        // const doctor = await Doctor.findOne({userId: req.body.userId });
       const appointments = await Appointment.find({userId: req.body.userId});
       res.status(200).send({ message: "Doctor Appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetched appointments ", success: false, error });
    }
});

router.get('/get-today-appointments-by-user-id', authMiddleware, async (req, res) => {
    try {
        // Find the doctor based on the logged-in user ID
        // const user = await User.findOne({ userId: req.body.userId });
        
        // if (!user) {
        //     return res.status(404).send({ message: "Doctor not found", success: false });
        // }

        // console.log(user);

        const todayDate = moment().startOf('day').toDate();

        // Query appointments for the doctor created today
        const appointments = await Appointment.find({
            userId: req.body.userId,
            createdAt: { $gte: todayDate, $lt: moment(todayDate).endOf('day').toDate() }
        });

        console.log(appointments);
        res.status(200).send({ message: "User's today appointments fetched successfully", success: true, data: appointments });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching appointments", success: false, error });
    }
});


router.get('/get-doctors-rating', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).send({ message: "User ID is required", success: false });
        }
        const ratings = await Review.find({ doctorId: userId });
        console.log(ratings);
        res.status(200).send({ message: "Doctor ratings fetched successfully", success: true, data: ratings });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching ratings", success: false, error });
    }
});


module.exports = router;