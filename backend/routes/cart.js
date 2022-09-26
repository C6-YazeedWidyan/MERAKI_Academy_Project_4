const express = require("express");
const { createCartForUser, getCartByUserId } = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", createCartForUser);
cartRouter.get("/:id", getCartByUserId);

module.exports = cartRouter;
