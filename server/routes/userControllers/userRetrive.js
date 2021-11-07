const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const isAuth = require("../../middlewares/isAuth.js");

const userRetrive = express.Router();

userRetrive.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  })
);

module.exports = userRetrive;
