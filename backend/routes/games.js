const express = require("express");
const {
  addNewGame,
  getAllGames,
  getGameById,
} = require("../controllers/games");
const gamesRouter = express.Router();

gamesRouter.post("/", addNewGame);
gamesRouter.get("/", getAllGames);
gamesRouter.get("/:id", getGameById);

module.exports = gamesRouter;
