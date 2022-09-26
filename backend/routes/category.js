const express = require("express");
const {
  getGameByCategory,
  getAllCategories,
} = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.get("/", getGameByCategory);
categoryRouter.get("/", getAllCategories);

module.exports = categoryRouter;
