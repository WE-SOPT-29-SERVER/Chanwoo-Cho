const users = require("../../dbMockup/user");
const util = require("../../lib/util");

const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  // 비구조화 할당(destructuring assginment)
  const { email, name, password } = req.body;

  // 파라미터의 잘못된 요청 값도 체크를 해줘야한다!
  if (!email || !name || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // users 속 배열안에 똑같은 이메일 값을 가진 유저가 있는가 체크
  const isExistUser = users.filter((obj) => obj.email === email).length > 0;
  if (isExistUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
  }
  // key와 value가 이름이 같으면 value 생략 가능이다.
  const user = { email, name, password };

  res
    .status(statusCode.OK)
    .json(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, user));
};