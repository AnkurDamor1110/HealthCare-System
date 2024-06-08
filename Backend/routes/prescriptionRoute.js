const express = require("express");
const router = express.Router();
const { getPrescriptions, savePrescription } = require("../controllers/prescriptionController");
const Prescription = require('../models/prescriptionModel');
const Appointment = require("../models/appointmentModel");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/prescriptions", savePrescription);
router.get("/prescriptions", getPrescriptions);



router.get('/get-prescriptions-by-user-id', authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId; // Get the user ID from the authenticated user
    const appointments = await Appointment.find({ userId: userId });
    
    if (!appointments.length) {
      return res.status(200).send({ success: true, data: [] });
    }

    const appointmentIds = appointments.map(appointment => appointment._id);
    const prescriptions = await Prescription.find({ appointmentId: { $in: appointmentIds } });

    // console.log('Prescriptions:', prescriptions);
    // console.log('Appointment IDs:', appointmentIds);
    
    res.status(200).send({ success: true, data: prescriptions });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ success: false, message: 'Error fetching prescriptions', error });
  }
});


module.exports = router;
