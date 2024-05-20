const express = require('express');
const app = express();
require('dotenv').config();
const dbconfig = require("./config/dbconfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");
const medicineRoute = require("./routes/medicineRoutes");
const prescriptionRoute = require("./routes/prescriptionRoute");

app.use('/api/user', userRoute);
app.use('/api/admin',adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api', medicineRoute );
app.use('/api', prescriptionRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});