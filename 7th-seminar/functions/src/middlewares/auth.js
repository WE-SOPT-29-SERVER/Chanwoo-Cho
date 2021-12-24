const functions = require('firebase-functions');
const jwtHandlers = require('../lib/jwtHandlers'); // jwt토큰을 발행하고, 확인해주는 놈
const db = require('../db/db');
const util = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { userDB } = require('../db');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');

// 클라이언트로 부터 req를 받아와서 처리 하는거임~
const checkUserByToken = async (req, res, next) => {
  // request headers에 accesstoken라는 이름으로 담긴 값(jwt)을 가져옵니다.
  const { accesstoken, refreshtoken } = req.headers;
  // accesstoken이 없을 시의 에러 처리입니다.
  if (!accesstoken) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.TOKEN_EMPTY));

  let client;
  try {
    client = await db.connect(req);
    // 해독된 토큰은 payload 형태가 됨.
    // jwt를 해독하고 인증 절차를 거칩니다.
    const decodedAccesstoken = jwtHandlers.verify(accesstoken);
    const decodedRefreshtoken = jwtHandlers.verify(refreshtoken);

    // token의 만료 여부에 따른 분기
    if (decodedAccesstoken === TOKEN_EXPIRED || decodedAccesstoken === TOKEN_INVALID) { // accesstoken 만료
      if (decodedRefreshtoken === TOKEN_EXPIRED) { // refreshtoken도 만료
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_EXPIRED))
      } else { // accesstoken만 만료
        const userId = decodedAccesstoken.id;
        if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID))

        const user = await userDB.getUserById(client, userId);
        if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));
        // 해당 user 가져와서 accesstoken 재발급
        const { accesstoken: newAccesstoken } = jwtHandlers.sign(user);
        
        res.cookie('accesstoken', newAccesstoken);
        req.cookies.accesstoken = newAccesstoken;
        next();
      }
    } else if (decodedRefreshtoken === TOKEN_EXPIRED) { // refreshtoken만 만료
      const userId = decodedAccesstoken.id;
      if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID))

      const user = await userDB.getUserById(client, userId);
      if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));
      // 해당 user 가져와서 refreshtoken 재발급 --> 해당 user의 DB에 refreshtoken 저장
      const { refreshtoken: newRefreshtoken } = jwtHandlers.sign();
      await userDB.updateUserToken(client, {}, userId, newRefreshtoken);
      
      res.cookie('refreshtoken', newRefreshtoken);
      req.cookies.refreshtoken = newRefreshtoken;
      next();
    } else { // accesstoken과 refreshtoken 모두 유효
      const userId = decodedAccesstoken.id;
      if (!userId) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID))

      const user = await userDB.getUserById(client, userId);
      if (!user) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));
      // 다음 미들웨어부터 사용할 req.user에 user정보 넣어버리기
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    functions.logger.error(`[AUTH ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, accesstoken);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};

module.exports = { checkUserByToken };