const userModel = require("../models/users");

const register = (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;

  const user = new userModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "Account Created Successfully",
        user: result,
      });
    })
    .catch((err) => {
      res.status(409);
      res.json({
        success: false,
        message: "The email already exists",
      });
    });
};

const getAllUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: "All the Users",
        users: result,
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

module.exports = { register, getAllUsers };
