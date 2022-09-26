const express = require("express");
const {
  createCartForUser,
  getCartByUserId,
  updateOnUserCart,
  deleteFromUserCart,
} = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", createCartForUser);
cartRouter.get("/", getCartByUserId);
cartRouter.put("/", updateOnUserCart);
cartRouter.delete("/", deleteFromUserCart);

module.exports = cartRouter;
