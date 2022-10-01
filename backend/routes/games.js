const express = require("express");
const {
  addNewGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
  searchGameByKeyword,
  getGamesByState,
  getGamesByIsAds,
} = require("../controllers/games");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const gamesRouter = express.Router();

gamesRouter.post("/", authentication, authorization("ADD_GAME"), addNewGame);
gamesRouter.get("/", getAllGames);
gamesRouter.get("/search", searchGameByKeyword);
gamesRouter.get("/state/:key", getGamesByState);
gamesRouter.get("/ads/:ads", getGamesByIsAds);
gamesRouter.get("/:id", getGameById);
gamesRouter.put(
  "/:id",
  authentication,
  authorization("UPDATE_GAME"),
  updateGameById
);
gamesRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_GAME"),
  deleteGameById
);
module.exports = gamesRouter;
