const functions = require("firebase-functions");
const db = require("../db/db");
const { userDB, postDB } = require("../db");
const _ = require("lodash");

const userListService = async (req, res) => {
    const { userId} = req.params;

    let client;
    try {
        client = await db.connect(req);
        // 요청 파라미터 비어 있음
        if (!userId) return -2;

        const users = await userDB.getAllUsers(client);
        /**
         * @TODO : user들의 id로 post찾기
         * */
        const userIds = [...new Set(users.filter(Boolean).map((o) => o.id))];
        const posts = await postDB.dbGetPostsByUserIds(client, userIds);

        for (let i = 0; i < users.length; i++) {
            users[i].posts = _.filter(posts, (o) => o.userId === users[i].id);
          }

        return { users, posts };

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        return -1;
      } finally {
        client.release(); // 빌려온 pool 반납
      }
};

const getUserService = async (req, res) => {
    const { userId } = req.params;
    
    let client;
    try {
        client = await db.connect(req);

        // 요청 파라미터 없음
        if (!userId) return -2;

        const user = await userDB.getUserById(client, userId);
        // 유저 없음
        if (!user) return -3;
        
        /**
         * @TODO : userId로 그놈들 post 가져오기
         */
         const posts = await postDB.getPostsByUserId(client, userId);

        return { user, posts };

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
      } finally {
        client.release(); // 빌려온 pool 반납
      }
};

const editUserService = async (req, res) => {
    const { userId } = req.params;
    const { username, phone } = req.body;
    
    let client;
    try {
        client = await db.connect(req);
        
        // 요청 파라미터 없음
        if (!userId) return -2;

        const editedUser = await userDB.updateUser(client, username, phone, userId);
        // 유저 없음
        if (!editedUser) return -3;

        return editedUser;

    } catch (error) {
        functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

const deleteUserService = async (req, res) => {
    const { userId } = req.params;
    
    let client;
    try {
        client = await db.connect(req);
        
        // 요청 파라미터 없음
        if (!userId) return -2;

        const deletedUser = await userDB.deleteUser(client, userId);

        return deletedUser;
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
    userListService,
    getUserService,
    editUserService,
    deleteUserService,
};