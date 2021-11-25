import express from "express";
import { 
    getSignup, 
    postSignup, 
    getLogin, 
    postLogin,
    getProfile, 
    logout } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.route("/signup").get(getSignup).post(postSignup);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.route("/profile/:id").get(getProfile);
userRouter.get("/logout", logout);

export default userRouter;