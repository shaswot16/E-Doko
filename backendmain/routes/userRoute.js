const express =require("express");
const router = express.Router();

const{registerUser,loginUser, logOut,forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile}=require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logOut);
router.route("/me").get(getUserDetails);
router.route("/password/update").put(updatePassword);
router.route("/me/update").put(updateProfile);







module.exports = router;
