const orderModel = require("../models/order");
const nodemailer = require("nodemailer");

const createOrder = (req, res) => {
  const { userId, userEmail } = req.body;
  const cart = req.body.cart;
  const total = req.body.total;

  const order = new orderModel({
    userId,
    cart,
    total,
  });

  order
    .save()
    .then(async (result) => {
      res.status(201);
      res.json({
        success: true,
        message: "Created order ",
      });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "redprojectmeraki@gmail.com", // generated ethereal user
          pass: "ynjhkeeivrxrxfka", // generated ethereal password
        },
      });

      const options = {
        from: "redprojectmeraki@gmail.com", // sender address
        to: userEmail, // list of receivers
        subject: "Thank you for purchase", // Subject line
        text: "your game code is O5SSK-D5631-QHO6Q", // plain text body
        html: "<b>your game code is O5SSK-D5631-QHO6Q</b>", // html body
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log("error", err);
        }
        console.log("infos", info);
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({
        message: "Server Error",
        Error: err.message,
      });
    });
};

const getOrdersByUserId = (req, res) => {
  const userId = req.params.id;

  orderModel
    .find({ userId })
    .populate("userId")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "The order is not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "The orders is found",
        orders: result,
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

const getAllOrders = (req, res) => {
  orderModel
    .find({})
    .populate("userId")
    .exec()
    .then((result) => {
      res.status(200).json({
        orders: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        Error: err.message,
      });
    });
};

module.exports = { getOrdersByUserId, createOrder, getAllOrders };
