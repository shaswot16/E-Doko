const Errorhandler = require("../utilis/errorhandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

exports.isAuthenticateduser = async (req, res, next) => {
  const token = req.cookies.token || req.body.token || req.query.token;
  console.log(token);

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  try {
    // console.log("we are inside the authentication"); //Working
    // console.log(process.env.JWT_SECRET); //Working
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("Inside authorization");
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
