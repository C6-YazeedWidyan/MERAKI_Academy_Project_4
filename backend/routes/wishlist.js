const express = require("express");
const {
  createWishListToUser,
  getWishListByUserId,
  updateOnUserWishList,
  deleteFromUserWishlist,
} = require("../controllers/wishlist");
const wishListRouter = express.Router();

wishListRouter.post("/", createWishListToUser);
wishListRouter.get("/", getWishListByUserId);
wishListRouter.put("/", updateOnUserWishList);
wishListRouter.delete("/", deleteFromUserWishlist);

module.exports = wishListRouter;
