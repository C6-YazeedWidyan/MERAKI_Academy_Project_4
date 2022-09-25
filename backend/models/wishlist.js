const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
});

module.exports = mongoose.model("WishList", wishlistSchema);
