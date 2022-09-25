const express = require("express");
const { addNewGame } = require("../controllers/games");
const gamesRouter = express.Router();

gamesRouter.post("/", addNewGame);

module.exports = gamesRouter;
