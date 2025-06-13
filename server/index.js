require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Stripe server is running ");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log(" Payment Request Received for this amount >>>", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).send({ error: err.message });
  }
});

app.listen(4242, () => console.log("✅ Server running on port 4242"));
