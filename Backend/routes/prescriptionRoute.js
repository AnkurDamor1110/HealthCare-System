const express = require("express");
const router = express.Router();
const { getPrescriptions, savePrescription } = require("../controllers/prescriptionController");

router.post("/prescriptions", savePrescription);
router.get("/prescriptions", getPrescriptions);

module.exports = router;
