const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRouter"));
router.use("/user", require("./userRouter"));
router.use("/post", require("./postRouter"));

module.exports = router;