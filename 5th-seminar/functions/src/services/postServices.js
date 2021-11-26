const functions = require("firebase-functions");
const db = require("../db/db");
const { postDB } = require("../db");

const getPostService = async (req, res) => {
    const { postId } = req.params;

    let client;
    try {
        client = await db.connect(req);

        // 요청 파라미터 없어~
        if (!postId) return -2;

        const post = await postDB.dbGetPostById(client, postId);
        // 포스트 없음
        if (!post) return -3;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

const editPostService = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    let client;
    try {
        client = await db.connect(req);

        // 요청 파라미터 없어~
        if (!postId) return -2;

        const editedPost = await postDB.dbUpdatePost(client, postId, title, content);
        // 포스트 없음~
        if (!editedPost) return -3;

        return editedPost;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

const deletePostService = async (req, res) => {
    const { postId } = req.params;
    
    let client;
    try {
        client = await db.connect(req);

        // 요청 파라미터 없어~
        if (!postId) return -2;

        const deletedPost = await postDB.dbDeletePost(client, postId);
        // 포스트 없음~
        if (!deletedPost) return -3;

        return deletedPost;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

const getAllPostService = async (req, res) => {
    let client;
    try {
        client = await db.connect(req);

        const allPosts = await postDB.dbGetAllPosts(client);

        return allPosts;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

const uploadPostService = async (req, res) => {
    const { userId, title, content } = req.body;
    
    let client;
    try {
        client = await db.connect(req);
        // 요청 바디 값 비어있음
        if (!userId) return -2;

        const uploadPost = await postDB.dbAddPost(client, userId, title, content);

        return uploadPost;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

module.exports = {
    getPostService,
    editPostService,
    deletePostService,
    getAllPostService,
    uploadPostService,
};