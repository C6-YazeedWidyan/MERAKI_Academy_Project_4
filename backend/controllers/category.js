const gameModel = require("../models/games");
const categoryModel = require("../models/category");

const getGameByCategory = (req, res) => {
  const categoryName = req.body.category;

  gameModel
    .find({ category: { $in: [categoryName] } })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status(500);
      res.json(err);
    });
};

const createNewCategory = (req, res) => {
  const { category } = req.body;

  const newCategory = new categoryModel({
    category,
  });

  newCategory
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "category added",
        category: result,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

const getAllCategories = (req, res) => {
  categoryModel
    .find({})
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "all category",
        categories: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Server Error",
        Error: err.message,
      });
    });
};

module.exports = { getGameByCategory, createNewCategory, getAllCategories };
