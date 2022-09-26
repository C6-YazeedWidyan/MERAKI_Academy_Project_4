const mongoose = require("mongoose");

const adminPanelSchema = new mongoose.Schema({
  orders: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
});

module.exports = mongoose.model("AdminPanel", adminPanelSchema);
