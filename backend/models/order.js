const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: { type: Object },
});

module.exports = mongoose.model("Order", orderSchema);
