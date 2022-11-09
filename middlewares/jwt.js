const jwt = require('jsonwebtoken');

const encode = async (user) => {
  return jwt.sign(
    {
      _id: user.id,
      role: user.role,
    },
    process.env.SECRET,
    {
      expiresIn: '2h',
    }
  );
};

const decode = async (token) => {
  return jwt.decode(token);
};

const verify = async (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  encode,
  decode,
  verify,
};
