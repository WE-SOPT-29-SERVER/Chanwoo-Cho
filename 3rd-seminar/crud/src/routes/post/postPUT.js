const util = require("../../lib/util");
const statusCode = require("../../constants/statusCode");
const responseMessage = require("../../constants/responseMessage");
const posts = require("../../dbMockup/post");

module.exports = async (req, res) => {
  const { postId } = req.params;
  const { title, text } = req.body;

  // title나 text값 하나는 들어있어야함
  if (!title && !text) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const post = posts.filter((post) => post.id === parseInt(postId));

  if (post.length == 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.NOT_FOUND, responseMessage.NO_POST));
  } else {
    if (title) post[0].title = title;
    if (text) post[0].text = text;
  }
  res
    .status(statusCode.OK)
    .json(
      util.success(statusCode.OK, responseMessage.MODIFY_POST_SUCCESS, post)
    );
};