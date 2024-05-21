const Prescription = require("../models/prescriptionModel.js");
const Appointment = require("../models/appointmentModel.js");
const User = require("../models/userModel.js");
const getPrescriptions = async (req, res) => {
  try {
    const userType = req.sender.userType;
    let prescriptions = [];

    const searchPatient = req.body.patientId;
    const searchDoctor = req.sender.doctorId;

    const matchDoctorPatient = {};

    if (searchPatient) {
      matchDoctorPatient.userId = searchPatient;
    }

    if (searchDoctor) {
      matchDoctorPatient.doctorId = searchDoctor;
    }

    if (searchPatient && searchDoctor) {
      matchDoctorPatient.userId = searchPatient;
      matchDoctorPatient.doctorId = searchDoctor;
    }

    prescriptions = await Prescription.find({})
      .populate({
        path: "prescribedMed.medicineId",
      })
      .populate({
        path: "appointmentId",
        match: matchDoctorPatient,
        populate: [
          {
            path: "userId",
            select: "name email", // Selecting specific fields from user info
          },
          {
            path: "doctorId",
            select: "name email", // Selecting specific fields from doctor info
          },
        ],
      })
      .then((prescriptions) =>
        prescriptions.filter((pre) => pre.appointmentId != null)
      );

    res.json({ message: "success", prescriptions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePrescription = async (req, res) => {
  try {
    const { appointmentId, prescribedMed, remarks, paid, userInfo } = req.body;

    const prescriptionDetails = await Prescription.create({
      appointmentId,
      prescribedMed,
      remarks,
      paid,
    });

   const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });

    const user = await User.findOne({ _id: appointment.userId});
    user.unseenNotifications.push({
      type: "new-prescription",
      message: `A new Prescription has been created for you  By Dr. ${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName} `,
      onclickPath: '/prescriptionview',
    });

    await user.save();

    res.status(200).json({ message: "success", prescription: prescriptionDetails });
  } catch (error) {
    res.status(400).json({ message: "error", errors: [error.message] });
  }
};


module.exports = {
  getPrescriptions,
  savePrescription,
};
