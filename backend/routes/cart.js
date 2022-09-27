const express = require("express");
const {
  createCartForUser,
  getCartByUserId,
  updateOnUserCart,
  deleteFromUserCart,
} = require("../controllers/cart");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const cartRouter = express.Router();

cartRouter.post("/", authentication, createCartForUser);
cartRouter.get("/", authentication, getCartByUserId);
cartRouter.put("/", authentication, authorization("UPDATE"), updateOnUserCart);
cartRouter.delete(
  "/",
  authentication,
  authorization("DELETE"),
  deleteFromUserCart
);

module.exports = cartRouter;
