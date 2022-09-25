const express = require("express");
const { addNewGame, getAllGames } = require("../controllers/games");
const gamesRouter = express.Router();

gamesRouter.post("/", addNewGame);
gamesRouter.get("/", getAllGames);

module.exports = gamesRouter;
