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
cartRouter.get("/:id", authentication, getCartByUserId);
cartRouter.put("/", authentication, authorization("update"), updateOnUserCart);
cartRouter.put(
  "/delete",
  authentication,
  authorization("delete"),
  deleteFromUserCart
);

module.exports = cartRouter;
