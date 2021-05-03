const User = require("../models/userModel");
const customError = require("../helpers/customError");

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // req.cookies.token, ekhane token holo token name(vaiable).
    const user = await User.findByToken(token); // is this (token ) going to the function findByToken inside the userModel? yes
    if (!user) next(customError("User was not found"), 404);
    req.user = user;
    next();
  } catch (error) {
    next(customError("you are not authenticated!"), 401);
  }
};
