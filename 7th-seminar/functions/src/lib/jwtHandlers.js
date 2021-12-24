const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');
const secretKey = process.env.JWT_SECRET;
const options = { // 토큰에 대한 정보
  algorithm: 'HS256', // 어떤 알고리즘으로 해싱했는지
  expiresIn: '1h', // 만료일은 언젠지
  issuer: 'wesopt', // 토큰 발행자는 누군지 
};
const refreshOptions = {
  algorithm: 'HS256', // 어떤 알고리즘으로 해싱했는지
  expiresIn: '14d', // 만료일은 언젠지
  issuer: 'wesopt', // 토큰 발행자는 누군지 
};

const sign = (user) => {
  const payload = { // payload에는 유저의 정보가 담긴다~!!
    id: user.id,
    email: user.email,
    name: user.name || null,
    idFirebase: user.idFirebase,
  };

  const result = {
    // sign의 첫번째 인자는 payload, 두번째 인자는 secret key, 다음은 option, 마지막 callback function
    accesstoken: jwt.sign(payload, secretKey, options), 
    // refresh 토큰애는 user 정보인 payload가 들어가지 않음
    refreshtoken: jwt.sign({}, secretKey, refreshOptions), 
  };
  return result;
};

const verify = (token) => {
  let decoded;
  try { // verify의 첫번째 인자는 클라에게 받은 token, 두번째 인자는 토큰 생성 시 사용했던 secret key, 마지막 callback function
    decoded = jwt.verify(token, secretKey); // 날아온 토큰이 secretKey가 맞는지 검증
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      functions.logger('expired token');
      return TOKEN_EXPIRED;
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      functions.logger('invalid token');
      console.log(TOKEN_INVALID);
      return TOKEN_INVALID;
    } else {
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  }
  return decoded;
};

module.exports = {
  sign,
  verify,
};