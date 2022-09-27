const express = require("express");
const { createNewRole } = require("../controllers/roles");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const roleRouter = express.Router();

roleRouter.post("/", authentication, authorization("CREATE"), createNewRole);

module.exports = roleRouter;
