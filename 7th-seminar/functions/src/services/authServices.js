const functions = require("firebase-functions");
const admin = require('firebase-admin');
const db = require("../db/db");
const { userDB } = require("../db");
const jwtHandlers = require("../lib/jwtHandlers");
const { signInWithEmailAndPassword } = require("@firebase/auth");
const { firebaseAuth } = require("../config/firebaseClient");

const signupService = async (req) => {
    const { email, password, name, phone } = req.body;
    
    let client;
    try {
        client = await db.connect();
        // req.body 부족!
        if ( !email || !password || !name || !phone) return -2;

        const userFirebase = await admin
            .auth()
            .createUser({ email, password, name }) // email, password 반드시 필요
            .then(user => user) // createUser 끝났으면 user반환해라~
            .catch(e => {
                console.log(e);
                return { err: true, error: e}; // ==> userFirebase.err = true, userFirebase.error = e
            });

        if (userFirebase.err) { // true
            if (userFirebase.error.code === 'auth/email-already-exists') return -3;
            else if (userFirebase.error.code === 'auth/invalid-password') return -4;
            else return -5; // firebase 오류
        }

        // RDS DB에 유저 생성
        const idFirebase = userFirebase.uid;
        const user = await userDB.addUser(client, email, name, phone, idFirebase); // password는 db에 저장 안함 
        // jwt 발급~!!~!~
        const { accesstoken } = jwtHandlers.sign(user);

        // user와 accesstoken 반환~!
        return { user, accesstoken };
        // 클라에서 accesstoken을 가지고 인증에 필요한 요청 함!

    } catch (error) {
        console.log(error);
        return -1;
    } finally {
        client.release();
    }
};

const loginService = async (req) => {
    const { email, password } = req.body;
    // 요청 바디 부족!
    if ( !email || !password ) return -2;

    let client;
    try {
        client = await db.connect(req);

        const userFirebase = await signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(user => user)
            .catch(e => {
                console.log(e);
                return { err: true, error: e};
            });

        if (userFirebase.err) {
            // 해당 유저가 없음
            if (userFirebase.error.code === 'auth/user-not-found') return -3;
            // 이메일 형식 오류
            else if (userFirebase.error.code === 'auth/invalid-email') return -4;
            // 패스워드 틀림
            else if (userFirebase.error.code === 'auth/wrong-password') return -5;
            // firebase 오류
            else return -6;
        }

        // idFirebase에 user의 uid를 저장시킴
        const { 
            user: { uid: idFirebase }, 
        } = userFirebase;
        // const idFirebase = userFirebase.user.uid;
        // const { uid : idFirebase } = userFirebase.user;
        // const { user: { uid: idFirebase },} = userFirebase;
        
        // db에서 찾은 user를 통해 토큰 발급
        const { accesstoken, refreshtoken } = jwtHandlers.sign(user); 
        const jwtToken = { accesstoken, refreshtoken };
        // 유저 DB에 refreshtoken 저장하기
        await userDB.updateUserToken(client, idFirebase, {}, refreshtoken);
        // 반환할 유저 정보 가져오기
        const user = await userDB.getUserByIdFirebase(client, idFirebase);
        
        return { user, jwtToken };
    } catch (error) {
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

module.exports = { signupService, loginService };