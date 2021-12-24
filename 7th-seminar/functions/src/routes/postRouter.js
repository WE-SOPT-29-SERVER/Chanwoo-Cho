const express = require("express");
const { 
    getPost, 
    editPost, 
    deletePost, 
    getAllPost, 
    uploadPost } = require("../controllers/postControllers");
const { checkUserByToken } = require('../middlewares/auth');
const uploadImage = require("../middlewares/uploadImage");
const router = express.Router();

router.route('/:postId', checkUserByToken)
    .get(getPost)
    .put(editPost)
    .delete(deletePost);
    
router.route("/")
    .get(getAllPost)
    .post(uploadImage, uploadPost);

module.exports = router;