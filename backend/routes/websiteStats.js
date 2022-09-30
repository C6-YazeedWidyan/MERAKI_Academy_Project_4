const express = require("express");
const {
  getAllUsersWithTotal,
  getAllGamesWithTotal,
  getAllOrdersWithTotal,
} = require("../controllers/websiteStats");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const websiteStatsRouter = express.Router();

websiteStatsRouter.get("/users", authentication, getAllUsersWithTotal);
websiteStatsRouter.get("/orders", authentication, getAllOrdersWithTotal);
websiteStatsRouter.get("/games", authentication, getAllGamesWithTotal);

module.exports = websiteStatsRouter;
