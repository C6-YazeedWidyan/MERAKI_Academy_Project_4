const express = require("express");
const { paymentCheckout } = require("../controllers/payment");
const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", paymentCheckout);

module.exports = paymentRouter;
