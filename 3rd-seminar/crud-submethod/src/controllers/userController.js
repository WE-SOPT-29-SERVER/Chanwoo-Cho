import users from "../../dbMokup/user";
import statusCode from "../../constant/statusCode";
import responseMessage from "../../constant/responseMessage";"../../constant/responseMessage";
import util from "../../lib/util";

export const home = (req, res) => res.send("HOME");

export const getSignup = (req, res) => res.render("signup", {pageTitle: "Signup"});
export const postSignup = async(req, res) => {
    const { id, name, password, email } = req.body;
    // request data 확인 - 네 개 중 하나라도 없다면  Bad Request반환
    if( !id || !name || !password || !email ) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(
                    statusCode.BAD_REQUEST,
                    responseMessage.BAD_REQUSET
            ));
    }
    // 해당 email을 가진 유저가 이미 있을 경우 Already Email 반환
    const alreadyEmail = users.filter(user => user.email === email).length > 0;
    if(alreadyEmail){
        return res.
            status(statusCode.CONFLICT)
            .send(util.fail(
                statusCode.CONFLICT, 
                responseMessage.ALREADY_EMAIL
            ));
    }

    const newUser = { id, name, password, email };

    users.push(newUser);

    return res
        .status(statusCode.OK)
        .send(util.success(
            statusCode.OK, 
            responseMessage.CREATED_USER, 
            newUser
        ));

};

export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});
export const postLogin = async(req, res) => {
    const { name, password } = req.body;
    // request data확인 - 없으면 Null Value 반환
    if( !email || !password ) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(
                statusCode.BAD_REQUEST, 
                responseMessage.NULL_VALUE
            ));
    }
    // 존재하는 유저인지 확인 - 없다면 No User 반환
    const existUser = users.filter( user => user.email === email )[0];
    if(!existUser) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(
                statusCode.BAD_REQUEST,
                responseMessage.NO_USER
            ));
    }
    // 비밀번호 확인 - 틀렸다면 Missmatch password 반환
    if( existUser.password !== password ) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(
                statusCode.BAD_REQUEST,
                responseMessage.MISS_MATCH_PW
            ));
    }
    // 성공 - login sucess와 함꼐 비밀번호를 제외한 유저 정보 반환
    return res
        .status(statusCode.OK)
        .send(util.success(
            statusCode.OK, 
            responseMessage.LOGIN_SUCCESS, 
            {
                existUser: {
                    id: existUser.id,
                    email: existUser.email,
                    name: existUser.name,
                },
            },
        ));
};

export const getProfile = (req, res) => res.send("GET PROFILE");

export const logout = (req, res) => {};
