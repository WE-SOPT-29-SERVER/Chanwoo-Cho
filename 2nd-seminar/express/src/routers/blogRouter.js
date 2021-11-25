import express from "express";
import { getBlog, postBlog } from "../controllers/blogController";

export const blogRouter = express.Router();

blogRouter.route("/:id").get(getBlog).post(postBlog);

export default blogRouter;