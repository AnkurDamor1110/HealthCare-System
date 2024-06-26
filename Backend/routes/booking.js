const express = require('express');
const authenticate = require("../middlewares/authMiddleware");
const getCheckoutSession = require("../controllers/bookingcontroller");

const router = express.Router()

router.post('/checkout-session', getCheckoutSession);


module.exports = router;