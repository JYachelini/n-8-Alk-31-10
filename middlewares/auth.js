const { ErrorObject } = require('../helpers');
const { transactionService } = require('../services');
const { verify } = require('./jwt');

const checkAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ErrorObject('You must log in', 403);
    }
    const token = req.headers.authorization.split(' ').pop();
    const tokenData = verify(token);
    if (!tokenData) throw new ErrorObject('Access denied', 403);

    req.user = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};

const ownershipUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (isAdmin(user.roleId) || user.id != id)
      throw new ErrorObject('not allowed', 403);

    return next();
  } catch (error) {
    return next(error);
  }
};

const ownershipTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = await transactionService.getById(id);
    const user = req.user;
    if (isAdmin(user.roleId) || user.id == userId) return next();

    throw new ErrorObject('not allowed', 403);
  } catch (error) {
    return next(error);
  }
};

const isAdmin = (roleId) => {
  return roleId == 1;
};

module.exports = {
  checkAuth,
  ownershipUser,
  ownershipTransaction,
  isAdmin,
};
