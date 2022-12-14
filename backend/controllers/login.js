const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The email doesn't exist`,
        });
      }
      try {
        const checkPassword = await bcrypt.compare(password, result.password);
        if (!checkPassword) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }

        const payload = {
          userId: result._id,
          role: result.role,
          country: result.country,
        };

        const options = {
          expiresIn: "60m",
        };

        const token = await jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          userProfile: result,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  login,
};
