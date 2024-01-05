const express = require("express");
const controllers = require("../controllers/userControllers");
const {router} = require("express/lib/application");
const userRouter = express.Router();

userRouter.route("/users").get(controllers.getAllUsers);

userRouter.route("/users").post(controllers.createUser);

userRouter.route("/users/:id").get(controllers.getUserById);

userRouter.route("/users/:id").put(controllers.updateUser);

userRouter.route("/users/:id").delete(controllers.deleteUser);

module.exports = userRouter;