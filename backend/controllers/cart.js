const cartModel = require("../models/cart");

const createCartForUser = (req, res) => {
  const { userId } = req.body;

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
  const userId = req.params.id;

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

module.exports = { createCartForUser, getCartByUserId };
