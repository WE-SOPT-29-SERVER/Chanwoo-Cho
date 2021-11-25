const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const result = {
    status: 200,
    msg: "API!",
  };

  res.status(200).send(result);
});

router.use("/blog", require("./blog"));
router.use("/users", require("./users"));
module.exports = router;