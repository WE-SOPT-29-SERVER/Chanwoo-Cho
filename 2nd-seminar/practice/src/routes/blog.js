const express = require("express");
const router = express.Router();

router.get("/", (res, req) => {
  const result = {
    status: 200,
    msg: "blog 접근",
  };
  res.status(200).send(result);
});

module.exports = router;