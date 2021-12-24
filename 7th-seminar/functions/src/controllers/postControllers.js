const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const { 
    deletePostService,
    getPostService,
    editPostService, 
    uploadPostService, 
    getAllPostService } = require("../services/postServices");


const getPost = async (req, res) => {
    try {
        const data = await getPostService(req);

        // 디비 에러
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 비어 있음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 포스트 없음
        else if (data === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
        }
        // 포스트 조회 성공~
        else {
            res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.READ_ONE_POST_SUCCESS,
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

const editPost = async (req, res) => {
    try {
        const data = await editPostService(req);

        // 디비 에러
        if (data === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 비어 있음
        else if (data === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 포스트 없음
        else if (data === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
        }
        // 포스트 편집 성공~
        else {
            res
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

const deletePost = async (req, res) => {
    try {
        const deletedData = await deletePostService(req);

        // 디비 에러
        if (deletedData === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 파라미터 비어 있음
        else if (deletedData === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 포스트 없음
        else if (deletedData === -3) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
        }
        // soft 삭제 성공~
        else {
            res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.DELETE_ONE_POST_SUCCESS,
                        deletedData
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


const getAllPost = async (req, res) => {
    try {
        const allData = await getAllPostService(req);

        // 디비 에러
        if (allData === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 모든 포스트 조회 성공~
        res
            .status(statusCode.OK)
            .send(
                util.success(
                    statusCode.OK,
                    responseMessage.READ_ALL_POSTS_SUCCESS,
                    allData
                )
            );

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

// upload는 userId 필요~!
const uploadPost = async (req, res) => {
    try {
        const addedData = await uploadPostService(req);

        // 디비 에러
        if (addedData === -1) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DB_ERROR));
        }
        // 요청 바디 값 비어 있음
        else if (addedData === -2) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }
        // 포스트 추가 업로드 성공~
        else {
            res
                .status(statusCode.OK)
                .send(
                    util.success(
                        statusCode.OK,
                        responseMessage.ADD_ONE_POST_SUCCESS,
                        addedData
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
    getPost, 
    editPost, 
    deletePost, 
    getAllPost, 
    uploadPost 
};