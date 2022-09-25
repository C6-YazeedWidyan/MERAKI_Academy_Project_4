const express = require("express");
const { register, getAllUsers, getUserById } = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.post("/", register);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);

module.exports = usersRouter;
