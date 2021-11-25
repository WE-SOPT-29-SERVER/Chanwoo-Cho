import express from "express";
import { 
    seeAllPost,
    see, 
    getEdit, 
    postEdit, 
    deleteBlog, 
    getUpload,
    postUpload} from "../controllers/postingController";

export const postingRouter = express.Router();

postingRouter.get("/", seeAllPost);
postingRouter.get("/:id", see);
postingRouter.route("/:id/edit").get(getEdit).post(postEdit);
postingRouter.route("/:id/delete").get(deleteBlog);
postingRouter.route("/upload").get(getUpload).post(postUpload);

export default postingRouter;