const { decode } = require('./jwt');
const { ErrorObject } = require('../helpers/error');

const ownership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { query } = req.query;

    if (!req.headers.authorization) {
      throw new ErrorObject('You must log in', 403);
    }

    let token = req.headers.authorization.split(' ').pop();

    let tokenDecode = decode(token);

    if (
      tokenDecode.roleId == 1 ||
      tokenDecode.id == query ||
      tokenDecode.id == id
    ) {
      return next();
    }

    throw new ErrorObject('not allowed', 403);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ownership,
};
