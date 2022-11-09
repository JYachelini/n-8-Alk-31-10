const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const encode = async (payload, expiresIn) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

const decode = async (token) => {
  return jwt.decode(token);
};

const verify = async (token) => {
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
