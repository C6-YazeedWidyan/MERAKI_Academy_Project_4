const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: { type: Array },
  total: { type: Number },
});

module.exports = mongoose.model("Order", orderSchema);
