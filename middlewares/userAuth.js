const { ErrorObject } = require('../helpers/error');
const { verify } = require('../middlewares/jwt');

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ErrorObject('You must log in', 403);
    }
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await verify(token); // null / token
    if (!tokenData) {
      throw new ErrorObject('Access denied', 403);
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkAuth;
