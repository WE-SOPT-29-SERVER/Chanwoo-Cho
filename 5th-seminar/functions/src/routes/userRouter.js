const express = require("express");
const { 
    getUserList, 
    getUser, 
    editUser, 
    deleteUser } = require("../controllers/userControllers");
const { checkUser } = require("../middlewares/auth");
const router = express.Router();

router.get("/list", getUserList);
router.route("/:userId")
    .get(checkUser, getUser)
    .put(editUser)
    .delete(deleteUser);

module.exports = router;