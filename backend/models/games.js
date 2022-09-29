const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  poster: { type: String },
  logo: { type: String },
  cover: { type: String },
  ads: { type: Boolean },
  category: { type: Array },
  description: { type: String, required: true },
  platform: { type: String },
  inStock: { type: Boolean },
  rating: { type: Number },
  newOrOld: { type: String },
  releaseDate: { type: String },
});

module.exports = mongoose.model("Game", gameSchema);
