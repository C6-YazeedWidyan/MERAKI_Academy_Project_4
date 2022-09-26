const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
} = require("../controllers/order");
const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrdersByUserId);

module.exports = orderRouter;
