const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

// const User = require('../models/user');
const Token = require('../models/token');

module.exports = {
  authUser: async function (req) {
    // console.log('auth headers', req.headers)

    if (!req || !req.headers || !req.headers.authorization) {
      throw new Error('Auth error: no authorization key provided');
    }

    const jwtToken = req.headers.authorization.substring(7);
    const jwtSignatureKey = config.JWT_PRIVATE_KEY;

    try {
      // db auth token
      const token = await Token.findOne({ value: jwtToken, active: true });
      if (!token) throw new Error('Auth error: Token not exists');
      if (new Date() > new Date(token.expiryDate))
        throw new Error('Auth error: Token is out of date');

      const payload = jwt.verify(jwtToken, jwtSignatureKey, {
        ignoreExpiration: false,
      });
      const userId = payload.userId;

      if (!userId) {
        throw new Error("Auth error: can't decode jwtToken to userID");
      }

      return {
        userId: userId,
      };
    } catch (e) {
      if (e && e.message) {
        throw new Error('Auth error: ' + e.message);
      } else {
        throw new Error('Auth error');
      }
    }
  },
};
