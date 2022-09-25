const gameModel = require("../models/games");

const addNewGame = (req, res) => {
  const {
    name,
    price,
    image,
    category,
    description,
    platform,
    inStock,
    rating,
    releaseDate,
  } = req.body;

  const game = new gameModel({
    name,
    price,
    image,
    category,
    description,
    platform,
    inStock,
    rating,
    releaseDate,
  });

  game
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "game added",
        game: result,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

module.exports = { addNewGame, getAllGames };
