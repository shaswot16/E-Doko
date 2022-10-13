const Errorhandler = require("../utilis/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utilis/jwtToken");
const sendEmail =require("../utilis/sendEmail");
const crypto= require("crypto")

// Register A User
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email ||  !password ) {
        return res.status(422).json({ error: "Plz fille the fields properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        console.log(userExist);
        if (userExist) {
            return res.status(422).json({ error: "email exist" });
        }
        else{

            const user = await User.create({
                name, email, password,
                avatar: { 
                    public_id: "this is a sample id",
                    url: "this is a sample url"
                }
            });
            sendToken(user, 201, res);
        }

}
catch (err) {
    console.log(err);
}}


exports.loginUser = async (req, res, next) => {
    console.log("Inside user Login");
    const { email, password } = req.body;
    console.log(req.body.email);

    //"Checking if user has given password and email both";

    if (!email || !password) {
        return next(new Errorhandler("Please Enter Email and Password", 400))
    }
    const user = await User.findOne( { email } ).select('+password')

    //console.log("checking 2");
    if (!user) {
        return next(new Errorhandler("Invalid Email and Password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid Email and Password", 401))
    }
    sendToken(user, 201, res);
}


exports.logOut = async (req, res, next) => {
    // req.cookie("token", null, {
    //     expires: new Date(Date.now()),
    //     httpOnly: true,
    // });

    // try {
    //     res.clearCookie('token');
        
    // } catch (error) {
        
    // }
    res.clearCookie('token',{path:'/api/v1/'});
    

    res.status().send('User Logout');

    res.status(200).json({
        sucess: true,
        message: "Logged Out",
    })
}

// Forgot Password

exports.forgotPassword = async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new Errorhandler("Invalid Email", 404));
    }

    //Get reset password token

    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});


    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then ,please ignore it`;

    try {

        await sendEmail({
            email:user.email,
            subject:`E-Doko Password Recovery`,
            message,
        });

        res.status(200).json({
            sucess:true,
            message:`Email sent to ${user.email} sucessfully`,
        });
        
    } catch (error) {

        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({
            validateBeforeSave: false
        })
        return next(new Errorhandler(error.message, 500));

        
    }
}

exports.resetPassword =async(req,res,next)=>{

    //Creating token hash
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt : Date.now()},
    });

    if(!user){
        return next(new Errorhandler("Reset Password token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new Errorhandler("Password Does not match ", 500));
    }

    user.password = req.body.password;
    user.resetPasswordToken =undefined;
    user.resetPasswordExpire= undefined;

    await user.save();

    sendToken(user,200,res);

}


//Get user detail
exports.getUserDetails = async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        sucess:true,
        user,
    });
}


//Update user password
exports.updatePassword = async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
}


exports.updateProfile = async(req,res,next)=>{
    const newUserData ={
        name: req.user.name,
        email :req.user.email,
    }
    // We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });
}