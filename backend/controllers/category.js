const gameModel = require("../models/games");

const getGameByCategory = (req, res) => {
  const categoryName = req.body.category;
  console.log(categoryName);

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

module.exports = { getGameByCategory };
