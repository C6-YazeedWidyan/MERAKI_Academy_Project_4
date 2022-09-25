const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: Array },
});

module.exports = mongoose.model("Category", categorySchema);
