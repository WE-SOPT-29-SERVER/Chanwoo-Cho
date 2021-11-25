const util = require("../../lib/util");
const statusCode = require("../../constants/statusCode");
const responseMessage = require("../../constants/responseMessage");
const posts = require("../../dbMockup/post");

module.exports = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const post = posts.filter((post) => post.id === parseInt(postId));

  if (post.length == 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
  }
  res
    .status(statusCode.OK)
    .json(util.success(statusCode.OK, responseMessage.READ_POST_SUCCESS, post));
};