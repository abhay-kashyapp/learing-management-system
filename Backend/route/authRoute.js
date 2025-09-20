import express from 'express';
import { signUp, login, logOut } from '../controllers/authController.js';
import { sendOTP, verifyOTP, resetPassword } from '../controllers/authController.js';
import { googleAuth } from '../controllers/authController.js';


const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sendOTP);
authRouter.post("/verifyotp", verifyOTP);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googleauth", googleAuth);

export default authRouter;