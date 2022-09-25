const express = require("express");
const { register, getAllUsers } = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.post("/", register);
usersRouter.get("/", getAllUsers);

module.exports = usersRouter;
