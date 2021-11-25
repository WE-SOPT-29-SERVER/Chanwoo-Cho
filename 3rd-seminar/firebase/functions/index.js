const admin = require("firebase-admin"); // 얘가 있어야 firebase fuctions를 실행 가능
const serviceAccount  = require("./wesopt29-efa68-firebase-adminsdk-ncev5-0b2a071afb.json"); // adim권한을 얻기위해 제공하는 credential
const dotenv = require("dotenv");// .env 사용할 수 있게 해줌

dotenv.config();

let firebase;
if(admin.apps.length === 0) {
    firebase = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} else {
    firebase = admin.app();
}

module.exports =  {
    api: require("./src").default,
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
