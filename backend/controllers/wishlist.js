const wishListModel = require("../models/wishlist");

const createWishListToUser = (req, res) => {
  const { userId } = req.body;

  wishListModel
    .findOne({ userId })
    .populate("games")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200);
        res.json({
          message: "the user have wish list",
          wishList: result,
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
              wishList: result,
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
    .catch((err) => {
      res.status(500);
      res.json({
        message: "Server Error",
        Error: err.message,
      });
    });
};

const getWishListByUserId = (req, res) => {
  const userId = req.params.id;

  wishListModel
    .findOne({ userId })
    .populate("games")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The wish list is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "The wish list is found",
        wishList: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const updateOnUserWishList = (req, res) => {
  const { userId, gameId } = req.body;

  wishListModel
    .findOne({ userId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The wish list is not found",
        });
      }
      if (result.games.includes(gameId)) {
        res.status(302).json({
          message: "the game is in wish list",
        });
      } else {
        wishListModel
          .findOneAndUpdate(
            { userId },
            { $push: { games: gameId } },
            { new: true }
          )
          .populate("games")
          .exec()
          .then((result) => {
            res.status(201).json({
              success: true,
              message: "Added the game",
              wishList: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: "Server Error",
              Error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const deleteFromUserWishlist = (req, res) => {
  const { userId, gameId } = req.body;

  wishListModel
    .findOneAndUpdate({ userId }, { $pull: { games: gameId } })
    .populate("games")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "game deleted from wish list",
        });
      } else {
        throw err;
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports = {
  createWishListToUser,
  getWishListByUserId,
  updateOnUserWishList,
  deleteFromUserWishlist,
};
