const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        console.log(req.body.email);
        if (userExists) {
            return res.status(200).send({ message: "User already exists", success: false });
        }
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new User(req.body);
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
       res.status(200).send({ message: "All Notification Deleted", success: true, data: updatedUser });
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


module.exports = router;