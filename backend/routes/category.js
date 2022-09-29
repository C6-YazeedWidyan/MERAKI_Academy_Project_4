const express = require("express");
const {
  getGameByCategory,
  getAllCategories,
  createNewCategory,
} = require("../controllers/category");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const categoryRouter = express.Router();

categoryRouter.get("/", getGameByCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.post(
  "/",
  authentication,
  authorization("create"),
  createNewCategory
);

module.exports = categoryRouter;
