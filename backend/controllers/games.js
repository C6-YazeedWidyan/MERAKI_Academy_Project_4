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

const getAllGames = (req, res) => {
  gameModel
    .find({})
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "All the games",
        games: result,
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

const getGameById = (req, res) => {
  const id = req.params.id;

  gameModel
    .findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The game is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: `The game with id ${id}`,
        game: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const updateGameById = (req, res) => {
  const id = req.params.id;

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

  gameModel
    .findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        image,
        category,
        description,
        platform,
        inStock,
        rating,
        releaseDate,
      },
      { new: true }
    )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The game is not found",
        });
      }
      res.status(201).json({
        success: true,
        message: "The game updated",
        game: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const deleteGameById = (req, res) => {
  const id = req.params.id;

  gameModel
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The game is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "game deleted",
        game: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

module.exports = {
  addNewGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
};
