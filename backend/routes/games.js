const express = require("express");
const {
  addNewGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
  searchGameByKeyword,
  getGamesByNewOrOld,
} = require("../controllers/games");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const gamesRouter = express.Router();

gamesRouter.post("/", addNewGame);
gamesRouter.get("/", searchGameByKeyword);
gamesRouter.get("/", getAllGames);
gamesRouter.get("/neworold", getGamesByNewOrOld);
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
