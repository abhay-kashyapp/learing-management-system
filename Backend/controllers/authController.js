import User from "../Model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";
import sendEmail from "../config/sendMail.js";


// SignUp function

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json({ message: `SignUp error: ${error}` });
    
  }
};





// Login function

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user= await User.findOne({ email });
   if(!user){
    return res.status(404).json({ message: "User not found" });
   }
   let isMatch = await bcrypt.compare(password, user.password)
   if (!isMatch) {
    return res.status(400).
    json({ message: "Invaliid password" });
    
   }


    let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(user);


  } catch (error) {
     return res.status(500).json({ message: `Login error: ${error}` });
  }
}




// Logout function

export const logOut= async (req, res) => {
 try {
  await res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
 } catch (error) {
   return res.status(500).json({ message: `LogOut error:${error}` } );
 }
}




// send otp

export const sendOTP = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({ email });
    if(!user){
     return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
    user.resetOtp = otp,
    user.otpExpires = Date.now() + 5 * 60 * 1000 ,
    user.isOtpVerifed = false
    await user.save();

    await sendEmail(email, otp);
    return res.status(200).json({ message: "OTP send successfully" });

  } catch (error) {
   return res.status(500).json({ message: `send otp error:${error}` } );  
  }
}





// otp verify

export const verifyOTP = async (req, res) => {
  try {
    const {email,otp} = req.body 
     const user = await User.findOne({ email });
     if(!user || user.resetOtp != otp || user.otpExpires < Date.now){
     return res.status(404).json({ message: "Invalid OTP" });
    }
    user.isOtpVerifed = true,
    user.resetOtp = undefined,
    user.otpExpires = undefined 

    await user.save();
    return res.status(200).json({ message: "OTP Verified successfully" });
    
  } catch (error) {
      return res.status(500).json({ message: `verified otp error:${error}` } );  
  }
}





// create password

export const resetPassword = async (req, res) => {
try {
  const {email,password} = req.body
  const user = await User.findOne({ email });
   if(!user || !user.isOtpVerifed ){
     return res.status(404).json({ message: "OTP Verifiaction is required" });
    }
  const hashPassword = await bcrypt.hash(password, 10);
  user.password = hashPassword,
  user.isOtpVerifed = false
  
  await user.save();
  return res.status(200).json({ message: "Password reset successfully" });  

     
} catch (error) {
   return res.status(500).json({ message: `reset password error:${error}` } );  

}
 
}





// google sign up

export const googleAuth  = async (req, res) => {
 try {
  const {name, email, role,photoUrl} = req.body;
  let user = await User.findOne({email})
  if(!user){
    user = await User.create({name, email, role: role || "student", googleAuth:true,photoUrl});
  }
   let token = await genToken(user._id)
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(user);
 } catch (error) {
  console.log(error);
  toast.error(error.response.data.message );
}
}
