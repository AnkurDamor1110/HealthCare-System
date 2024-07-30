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
const bookingRoute = require("./routes/booking");
const contactRoute = require("./routes/contactRoute");
const cors = require('cors');

app.use(cors({
    origin: 'https://66a93a9d891ff300081ae1ed--healthcare1110.netlify.app'
  })); 

app.use('/api/user', userRoute);
app.use('/api/admin',adminRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api', medicineRoute );
app.use('/api', prescriptionRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/form', contactRoute);

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});