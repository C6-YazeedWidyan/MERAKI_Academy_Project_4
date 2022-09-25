const express = require("express");
const { createNewRole } = require("../controllers/roles");
const roleRouter = express.Router();

roleRouter.post("/", createNewRole);

module.exports = roleRouter;
