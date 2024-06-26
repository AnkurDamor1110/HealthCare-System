const User = require("../models/userModel");
const Doctor = require("../models/doctarModel");
const Booking = require("../models/bookingModel");
const Stripe = require("stripe");

const getCheckoutSession = async (req, res) => {
    try {
        const { doctorId, userId } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const user = await User.findById(userId);
        console.log(doctor.feesPerConsultation);
        if (!doctor || !user) {
            return res.status(404).json({ success: false, message: "Doctor or user not found" });
        }

        const feesPerConsultation = parseFloat(doctor.feesPerConsultation);

        if (isNaN(feesPerConsultation)) {
            return res.status(400).json({ success: false, message: "Invalid doctor fees per consultation" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor._id}`,
            customer_email: user.email,
            client_reference_id: doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        unit_amount: Math.round(feesPerConsultation * 100),
                        product_data: {
                            name: doctor.firstName,
                            description: doctor.specialization,
                            images: [doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        });

        console.log("Stripe session created:", session);

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.feesPerConsultation,
            session: session.id
        });

        // console.log("Booking object:", booking);

        await booking.save();

        res.status(200).json({ success: true, message: 'Successfully paid', session });
    } catch (err) {
        console.error("Error creating checkout session:", err);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

module.exports = getCheckoutSession;
