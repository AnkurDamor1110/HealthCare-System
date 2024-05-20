const express = require("express");
const router = express.Router();
const { getPrescriptions, savePrescription } = require("../controllers/prescriptionController");
const Prescription = require('../models/prescriptionModel');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/prescriptions", savePrescription);
router.get("/prescriptions", getPrescriptions);



router.get('/get-prescriptions-by-user-id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you get the user ID from the auth middleware
    const prescriptions = await Prescription.find({ patientId: userId });
    res.status(200).send({ success: true, data: prescriptions });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: 'Error fetching prescriptions', error });
  }
});


module.exports = router;
