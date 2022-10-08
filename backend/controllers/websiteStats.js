const userModel = require("../models/users");
const orderModel = require("../models/order");
const gameModel = require("../models/games");

const getAllUsersWithTotal = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "All the Users",
        users: result,
        usersTotal: result.length,
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

const getAllGamesWithTotal = (req, res) => {
  gameModel
    .find({})
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "All the games",
        games: result,
        gamesTotal: result.length,
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
const getAllOrdersWithTotal = (req, res) => {
  orderModel
    .find({})
    .then((result) => {
      const totalAmount = result.reduce((accumulator, element, index) => {
        return Math.ceil(accumulator) + element.total;
      }, 0);
      res.status(200);
      res.json({
        success: true,
        message: "All the orders",
        orders: result,
        ordersTotal: result.length,
        totalAmount: Math.ceil(totalAmount),
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

module.exports = {
  getAllUsersWithTotal,
  getAllGamesWithTotal,
  getAllOrdersWithTotal,
};
