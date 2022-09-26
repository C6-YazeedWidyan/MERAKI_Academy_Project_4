const wishListModel = require("../models/wishlist");

const createWishListToUser = (req, res) => {
  const { userId } = req.body;

  wishListModel
    .findOne({ userId })
    .then((result) => {
      if (result) {
        res.status(200);
        res.json({
          message: "the user have wish list",
        });
      } else {
        const wishList = new wishListModel({
          userId,
        });
        wishList
          .save()
          .then((result) => {
            res.status(201);
            res.json({
              success: true,
              message: "Created wish lsit to user",
            });
          })
          .catch((err) => {
            res.status(500);
            res.json({
              message: "Server Error",
              Error: err.message,
            });
          });
      }
    })
    .catch();
};

module.exports = { createWishListToUser };
