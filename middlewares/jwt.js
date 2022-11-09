const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const encode = (payload) => {
  return jwt.sign(payload, secret);
};

const decode = (token) => {
  return jwt.decode(token);
};

const verify = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

module.exports = {
  encode,
  decode,
  verify,
};
