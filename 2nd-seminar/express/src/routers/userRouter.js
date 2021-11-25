import express  from "express";
import { getLogin, postLogin, getSignup } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.route("/:id/login").get(getLogin).post(postLogin);
userRouter.route("/:id/signup").get(getSignup);

export default userRouter;