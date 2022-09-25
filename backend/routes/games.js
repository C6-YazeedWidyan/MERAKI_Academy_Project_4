const express = require("express");
const {
  addNewGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
} = require("../controllers/games");
const gamesRouter = express.Router();

gamesRouter.post("/", addNewGame);
gamesRouter.get("/", getAllGames);
gamesRouter.get("/:id", getGameById);
gamesRouter.put("/:id", updateGameById);
gamesRouter.delete("/:id", deleteGameById);

module.exports = gamesRouter;
