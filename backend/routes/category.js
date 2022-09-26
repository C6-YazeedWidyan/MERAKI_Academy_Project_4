const express = require("express");
const {
  getGameByCategory,
  getAllCategories,
  createNewCategory,
} = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.get("/", getGameByCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.post("/", createNewCategory);

module.exports = categoryRouter;
