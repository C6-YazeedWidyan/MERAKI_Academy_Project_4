const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
});

module.exports = mongoose.model("Order", orderSchema);
