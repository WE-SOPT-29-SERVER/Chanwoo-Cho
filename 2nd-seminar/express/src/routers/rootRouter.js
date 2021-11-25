import express from "express";
import { home } from "../controllers/blogController";

export const rootRouter = express.Router();

rootRouter.get("/", home);

export default rootRouter;