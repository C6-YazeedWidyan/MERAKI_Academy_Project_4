const express = require("express");
const { createWishListToUser } = require("../controllers/wishlist");
const wishListRouter = express.Router();

wishListRouter.post("/", createWishListToUser);

module.exports = wishListRouter;
