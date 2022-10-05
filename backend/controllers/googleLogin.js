const { OAuth2Client } = require("google-auth-library");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(
  "606010550679-fo7fr4vq71r5fh98unfmnhdijms2qcrr.apps.googleusercontent.com"
);

const googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "606010550679-fo7fr4vq71r5fh98unfmnhdijms2qcrr.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        userModel
          .findOne({ email })
          .populate("role", "-_id -__v")
          .exec((err, result) => {
            if (err) {
              return res.status(409).json({
                success: false,
                message: `somthing error`,
              });
            } else {
              if (result) {
                const payload = {
                  userId: result._id,
                  role: result.role,
                };

                const options = {
                  expiresIn: "60m",
                };

                const token = jwt.sign(payload, process.env.SECRET, options);
                res.status(200).json({
                  success: true,
                  message: `login success`,
                  userProfile: result,
                  token: token,
                });
              } else {
                const user = new userModel({
                  firstName: name.split(" ")[0],
                  lastName: name.split(" ")[1],
                  email: email,
                  password: "sssssssss",
                  role: "6330a779bd50d1f79ff6fca6",
                });

                user.save((err, data) => {
                  if (err) {
                    return res.status(409).json({
                      success: false,
                      message: `somthing error`,
                    });
                  }
                  const payload = {
                    userId: data._id,
                    role: data.role,
                  };

                  const options = {
                    expiresIn: "60m",
                  };

                  const token = jwt.sign(payload, process.env.SECRET, options);
                  res.status(200).json({
                    success: true,
                    message: `sign in succes`,
                    userProfile: data,
                    token: token,
                  });
                });
              }
            }
          });
      }
    });
};

module.exports = { googlelogin };
