const express = require("express");
const {
  createCartForUser,
  getCartByUserId,
  updateOnUserCart,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", createCartForUser);
cartRouter.get("/:id", getCartByUserId);
cartRouter.put("/", updateOnUserCart);

module.exports = cartRouter;
