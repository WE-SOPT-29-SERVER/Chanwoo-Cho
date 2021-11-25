import express from "express";
import { home } from "../controllers/userController";

export const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;