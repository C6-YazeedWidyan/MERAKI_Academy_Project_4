const orderModel = require("../models/order");

const createOrder = (req, res) => {
  const cartId = req.body;

  const order = new orderModel({
    cartId,
  });

  order
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "Created order ",
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        message: "Server Error",
        Error: err.message,
      });
    });
};

const getOrdersByUserId = (req, res) => {
  const { userId } = req.body;

  orderModel
    .find({ userId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The order is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "The orders is found",
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

module.exports = { getOrdersByUserId, createOrder };
