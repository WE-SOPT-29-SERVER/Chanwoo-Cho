const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const { signupService, loginService } = require("../services/authServices");

const signupController = async (req, res) => {
    try {
        const tokenData = await signupService(req);

        // DB 에러
        if (tokenData === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 바디 부족
        else if (tokenData === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 이미 존재하는 아이디
        else if (tokenData === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .json(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
        }
        // 비밀번호 형식 오류
        else if (tokenData === -4) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_PASSWORD)
                );
        }
        // 파이어 베이스 오류
        else if (tokenData === -5) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIREBASE_ERROR));
        }
        // 회원가입 성공
        else {
            res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK, 
                        responseMessage.CREATED_USER, 
                        tokenData)
                );
        }

    } catch (error) {
        return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
};


const loginController = async (req, res) => {
    try {
        const tokenData = await loginService(req);

        // 디비 에러
        if (tokenData === -1) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 바디 부족
        else if (tokenData === -2) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 해당 유저 없음
        else if (tokenData === -3) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        // 이메일 형식 오류
        else if (tokenData === -4) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.INVALID_EMAIL));
        }
        // 패스워드 틀림
        else if (tokenData === -5) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
        }
        // firebase 오류
        else if (tokenData === -6) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.FIREBASE_ERROR));
        }
        // 로그인 성공
        else {
            res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK, 
                        responseMessage.LOGIN_SUCCESS, 
                        tokenData
                    )
                );
        }   


    } catch (error) {
        return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
};

module.exports = { signupController, loginController };