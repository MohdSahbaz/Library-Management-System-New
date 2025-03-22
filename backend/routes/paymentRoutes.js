const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Route to create a Stripe Checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const {
      fineAmount,
      borrowId,
      userId,
      customerName,
      customerEmail,
      customerAddress,
    } = req.body;

    console.log(req.body);

    if (!customerName || !customerEmail || !customerAddress) {
      return res
        .status(400)
        .json({ message: "Customer name, email, and address are required" });
    }

    // Convert amount to cents (Stripe requires smallest currency unit)
    const amountInCents = fineAmount * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customerEmail,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"], // Ensuring only Indian addresses are accepted
      },
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Library Fine Payment",
              description: `Fine payment for ${customerName}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?userId=${userId}&bookId=${borrowId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
      metadata: {
        userId,
        bookId: borrowId,
        customerName,
        customerEmail,
        customerAddress,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
