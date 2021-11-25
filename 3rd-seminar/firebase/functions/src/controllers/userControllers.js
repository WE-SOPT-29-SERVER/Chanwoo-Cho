const util = require("../lib/util");
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");
const users = require("../dbMockup/user");

const signupController = async (req, res) => {
    const { name, email, password } = req.body;
    let users;
    // 요청 바디값이 비었을 때
    if ( !name || !email || password ) 
        return 
            res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    
    // 해당 email을 가진 유저가 이미 존재할 경우
    const alreadyUser = users.filter(obj => obj.email === email).length > 0;
    if (alreadyUser) 
        return 
            res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));

    const newUser = {
        id: users.length + 1,
        name,
        password,
        email,
    };
    users = users.push(newUser);

    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATED_USER, users));
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    // email || password 입력 안했을 때
    if (!email || !password) 
        return 
            res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));

    // 넘겨받은 이메일로 존재하는 이메일인지 확인하고 그놈 배열 반환
    const checkUser = users.filter(user => user.email === email)[0];
    // 없으면 혼내
    if (!checkUser)
        return 
            res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    // 있는데 비번을 잘못 입력했다?
    if ( checkUser.password !== password ) 
        return 
            res
                .status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST,responseMessage.MISS_MATCH_PW));  
                
    // 로그인 성공
    res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, checkUser));
};

module.exports = { signupController, loginController };