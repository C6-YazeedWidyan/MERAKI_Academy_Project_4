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
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        console.log(err);
        console.log(err.keyPattern);
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
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

const getUserById = (req, res) => {
  const id = req.params.id;

  userModel
    .findOne({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The user is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: `The user with id ${id}`,
        user: result,
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

module.exports = { register, getAllUsers, getUserById };
