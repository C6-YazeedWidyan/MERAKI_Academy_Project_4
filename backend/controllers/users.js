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

module.exports = { register };
