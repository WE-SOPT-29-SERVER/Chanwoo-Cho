const users = require("../../dbMockup/user");
const util = require("../../lib/util");

const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const isExistUser = users.filter((obj) => obj.email === email);
  if (isExistUser.length == 0) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));
  }

  if (isExistUser[0].password !== password) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(util.fail(statusCode.UNAUTHORIZED, responseMessage.LOGIN_FAIL));
  }
  const user = { email: isExistUser[0].email, name: isExistUser[0].name };
  res
    .status(statusCode.OK)
    .json(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, user));

  // return : 아예 끝내버리는 => 보통 에러처리 시 씀
  // res : 뒤에 다른 일을 더 할 수 있는! => 보통 성공적일 때 씀
};