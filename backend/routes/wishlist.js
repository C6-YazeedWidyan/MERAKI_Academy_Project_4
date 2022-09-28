const express = require("express");
const {
  createWishListToUser,
  getWishListByUserId,
  updateOnUserWishList,
  deleteFromUserWishlist,
} = require("../controllers/wishlist");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const wishListRouter = express.Router();

wishListRouter.post("/", authentication, createWishListToUser);
wishListRouter.get("/:id", authentication, getWishListByUserId);
wishListRouter.put(
  "/",
  authentication,
  authorization("update"),
  updateOnUserWishList
);
wishListRouter.put(
  "/delete",
  authentication,
  authorization("delete"),
  deleteFromUserWishlist
);

module.exports = wishListRouter;
