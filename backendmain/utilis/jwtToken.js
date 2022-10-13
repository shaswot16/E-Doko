//Create Token And Saving in cookie

const { models } = require("mongoose");
require("../models/userModel");

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    
    console.log("the token in sendToken ",token);
    //Token is being generated no problem in here

    res.cookie("token", token, {
        expires: new Date(Date.now() + 25920000000),
        httpOnly: true
    });
    res.status(statusCode).json({
          success: true,
          user,
          token,
  })}
  
  module.exports = sendToken;