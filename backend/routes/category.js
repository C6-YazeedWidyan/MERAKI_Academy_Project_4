const express = require("express");
const { getGameByCategory } = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.get("/", getGameByCategory);

module.exports = categoryRouter;
