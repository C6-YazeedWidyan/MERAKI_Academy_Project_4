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

wishListRouter.post("/", createWishListToUser);
wishListRouter.get("/", authentication, getWishListByUserId);
wishListRouter.put("/", authentication, authorization, updateOnUserWishList);
wishListRouter.delete(
  "/",
  authentication,
  authorization,
  deleteFromUserWishlist
);

module.exports = wishListRouter;
