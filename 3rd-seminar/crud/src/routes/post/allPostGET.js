const util = require("../../lib/util");
const statusCode = require("../../constants/statusCode");
const responseMessage = require("../../constants/responseMessage");
const posts = require("../../dbMockup/post");

module.exports = async (req, res) => {
  const allPost = {
    posts,
  };
  res
    .status(statusCode.OK)
    .json(
      util.success(
        statusCode.OK,
        responseMessage.READ_ALL_POSTS_SUCCESS,
        allPost
      )
    );
};