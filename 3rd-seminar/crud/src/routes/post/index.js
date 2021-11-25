const express = require("express");
const router = express.Router();

router.get("/:postId", require("./postGET"));
router.put("/:postId", require("./postPUT"));
router.delete("/:postId", require("./postDELETE"));

router.post("/", require("./postPOST"));
router.get("/", require("./allPostGET"));

module.exports = router;