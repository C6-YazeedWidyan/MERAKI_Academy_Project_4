const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  total: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
