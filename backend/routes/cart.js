const express = require("express");
const { createCartForUser } = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.post("/", createCartForUser);

module.exports = cartRouter;
