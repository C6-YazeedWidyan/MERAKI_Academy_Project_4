const express = require("express");
const { googlelogin } = require("../controllers/googleLogin");
const googleRouter = express.Router();

googleRouter.post("/", googlelogin);

module.exports = googleRouter;
