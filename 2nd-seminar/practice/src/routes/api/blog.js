const express = require("express");
const router = express.Router();

/**
 * [GET]
 * api/blog/post
 */

router.get("/post", (req, res) => {
  const result = {
    status: 200,
    msg: "api/blog/post 라우팅.",
  };
  res.status(200).send(result);
});

module.exports = router;

