const util = require("../../lib/util");
const statusCode = require("../../constants/statusCode");
const responseMessage = require("../../constants/responseMessage");
const posts = require("../../dbMockup/post");
const users = require("../../dbMockup/user");

module.exports = async (req, res) => {
  const { title, text, authorId } = req.body;

  if (!title || !text || !authorId) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const isUser = users.filter((user) => user.email === authorId);

  let authorName;

  if (isUser.length == 0) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  } else {
    authorName = isUser[0].name;
  }

  const newPost = {
    id: posts.length + 1,
    title,
    text,
    authorName,
  };

  res
    .status(statusCode.OK)
    .json(
      util.success(statusCode.OK, responseMessage.CREATE_POST_SUCESS, newPost)
    );
};