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
                  message: `yazeed`,
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
                    message: `aos`,
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

//         userModel
//           .findOne({ email })
//           .then(async (result) => {
//             if (result) {
//               const payload = {
//                 userId: result._id,
//                 role: result.role,
//                 country: result.country,
//               };

//               const options = {
//                 expiresIn: "60m",
//               };

//               const token = await jwt.sign(
//                 payload,
//                 process.env.SECRET,
//                 options
//               );
//               res.status(200).json({
//                 success: true,
//                 message: `Valid login credentials`,
//                 userProfile: result,
//                 token: token,
//               });
//             } else {
//               const user = new userModel({
//                 firstName: name.split(" ")[0],
//                 lastName: name.split(" ")[1],
//                 email: email,
//                 password: "sssssssss",
//                 role: "6330a779bd50d1f79ff6fca6",
//               });

//               user
//                 .save()
//                 .then(async (result1) => {
//                   const payload = {
//                     userId: result1._id,
//                     role: result1.role,
//                     country: result1.country,
//                   };

//                   const options = {
//                     expiresIn: "60m",
//                   };

//                   const token = await jwt.sign(
//                     payload,
//                     process.env.SECRET,
//                     options
//                   );
//                   res.status(200).json({
//                     success: true,
//                     message: `Valid login credentials`,
//                     userProfile: result1,
//                     token: token,
//                   });
//                 })
//                 .catch((err) => {
//                   return res.status(409).json({
//                     success: false,
//                     message: `The email already exists`,
//                   });
//                 });
//             }
//           })
//           .catch((err) => {
//             return res.status(409).json({
//               success: false,
//               message: `The email already exists`,
//             });
//           });
//       }
//       console.log(res.payload);
//     })
//     .catch((err) => console.log(err));

module.exports = { googlelogin };
