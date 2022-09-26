const cartModel = require("../models/cart");

const createCartForUser = (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  cartModel
    .findOne({ userId })
    .then((result) => {
      if (result) {
        res.status(200);
        res.json({
          message: "the user have cart",
        });
      } else {
        const cart = new cartModel({
          userId,
        });
        cart
          .save()
          .then((result) => {
            res.status(201);
            res.json({
              success: true,
              message: "Created cart to user",
            });
          })
          .catch((err) => {
            res.status(500);
            res.json({
              message: "Server Error",
              Error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500);
      res.json({
        message: "Server Error",
        Error: err.message,
      });
    });
};

const getCartByUserId = (req, res) => {
  const { userId } = req.body;

  cartModel
    .findOne({ userId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The cart is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "The cart is found",
        cart: result,
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

const updateOnUserCart = (req, res) => {
  const { userId, gameId } = req.body;

  cartModel
    .findOne({ userId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The cart is not found",
        });
      }
      if (result.games.includes(gameId)) {
        res.status(302).json({
          message: "the game is in cart",
        });
      } else {
        cartModel
          .findOneAndUpdate(
            { userId },
            { $push: { games: gameId } },
            { new: true }
          )
          .then((result) => {
            res.status(201).json({
              success: true,
              message: "Added the game",
              cart: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: "Server Error",
              Error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const deleteFromUserCart = (req, res) => {
  const { userId, gameId } = req.body;

  cartModel
    .findOneAndUpdate({ userId }, { $pull: { games: gameId } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "game deleted from cart",
        });
      } else {
        throw err;
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = {
  createCartForUser,
  getCartByUserId,
  updateOnUserCart,
  deleteFromUserCart,
};
