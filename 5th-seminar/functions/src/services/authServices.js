const functions = require("firebase-functions");
const admin = require('firebase-admin');
const db = require("../db/db");
const { userDB } = require("../db");
const jwtHandlers = require("../lib/jwtHandlers");
const { signInWithEmailAndPassword } = require("@firebase/auth");
const { firebaseAuth } = require("../config/firebaseClient");

const signupService = async (req, res) => {
    const { email, password, name, phone } = req.body;
    // req.body 부족!
    if ( !email || !password || !name || !phone) return -2;

    let client;
    try {
        client = await db.connect();

        const userFirebase = await admin
            .auth()
            .createUser({ email, password, name })
            .then(user => user)
            .catch(e => {
                console.log(e);
                return { err: true, error: e};
            });

        if (userFirebase.err) {
            if (userFirebase.error.code === 'auth/email-already-exists') return -3;
            else if (userFirebase.error.code === 'auth/invalid-password') return -4;
            else return -5; // firebase 오류
        }

        const idFirebase = userFirebase.uid;

        const user = await userDB.addUser(client, email, name, phone, idFirebase);
        const { accesstoken } = jwtHandlers.sign(user);

        return {user, accesstoken };

    } catch (error) {
        console.log(error);
        return -1;
    } finally {
        client.release();
    }
};

const loginService = async (req, res) => {
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

        const { 
            user: { uid: idFirebase },
        } = userFirebase;

        const user = await userDB.getUserByIdFirebase(client, idFirebase);

        const { accesstoken } = jwtHandlers.sign(user);

        return { user, accesstoken };
    } catch (error) {
        console.log(error);
        // 디비 에러
        return -1;
    } finally {
        client.release();
    }
};

module.exports = { signupService, loginService };