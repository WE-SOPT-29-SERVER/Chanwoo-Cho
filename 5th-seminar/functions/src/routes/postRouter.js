const express = require("express");
const { 
    getPost, 
    editPost, 
    deletePost, 
    getAllPost, 
    uploadPost } = require("../controllers/postControllers");
const router = express.Router();

router.route("/:postId").get(getPost).put(editPost).delete(deletePost);
router.route("/").get(getAllPost).post(uploadPost);

module.exports = router;