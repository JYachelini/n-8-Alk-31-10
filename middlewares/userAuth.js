const { ErrorObject } = require('../helpers');
const { jwt } = require('../middlewares/');

const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ErrorObject('You must log in', 403);
    }
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = await jwt.verify(token); // null / token
    if (!tokenData) {
      throw new ErrorObject('Access denied', 403);
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkAuth;
