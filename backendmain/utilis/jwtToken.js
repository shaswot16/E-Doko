//Create Token And Saving in cookie

const { models } = require("mongoose");
require("../models/userModel");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  console.log("the token in sendToken ", token);
  //Token is being generated no problem in here

  res.cookie("token", token, {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    httpOnly: true,
  });
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
