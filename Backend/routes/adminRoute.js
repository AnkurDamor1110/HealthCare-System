const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const authMiddleware = require("../middlewares/authMiddleware");

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


module.exports = router;