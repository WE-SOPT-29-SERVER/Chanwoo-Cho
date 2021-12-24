const express = require("express");
const { signupController, loginController } = require("../controllers/authControllers");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login/email", loginController);

module.exports = router;