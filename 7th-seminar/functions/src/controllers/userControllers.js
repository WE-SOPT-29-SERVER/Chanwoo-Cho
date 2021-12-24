const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const { 
    userListService, 
    getUserService, 
    editUserService, 
    deleteUserService } = require("../services/userServices");

const getUserList = async (req, res) => {
    try {
        const data = await userListService(req);
        // 에러 처리
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 없음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 유저 없음
        else if (data === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        // 유저 리스트 가져오기 성공
        else {
            return res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.READ_ALL_USERS_SUCCESS,
                        data
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

const getUser = async (req, res) => {
    try {
        const data = await getUserService(req);
        // 에러 처리
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 없음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 유저 없음
        else if (data === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        // 고유 유저 가져오기 성공
        else {
            return res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.READ_ONE_USER_SUCCESS,
                        data
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

const editUser = async (req, res) => {
    try {
        const data = await editUserService(req);
        // 디비 에러
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 없음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 유저 없음
        else if (data === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
        }
        // 편집 성공
        else {
            return res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.UPDATE_ONE_USER_SUCCESS,
                        data
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

const deleteUser = async (req, res) => {
    try {
        const data = await deleteUserService(req);
        // 에러 처리
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 없음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 삭제 성공
        else {
            return res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.DELETE_ONE_USER_SUCCESS,
                        data
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

module.exports = { 
    getUserList, 
    getUser, 
    editUser, 
    deleteUser,
};

