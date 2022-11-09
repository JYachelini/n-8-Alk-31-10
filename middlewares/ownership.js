const { decode } = require('./jwt');
const { ErrorObject } = require('../helpers/error');

const ownership = async (req, res, next) => {
  try {
    const { query } = req.query;

    let token = req.headers.authorization.split(' ').pop();

    let tokenDecode = await decode(token);

    if (tokenDecode.id === query || tokenDecode.roleId == 1) {
      next();
    } else {
      throw new ErrorObject('query not allowed', 403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ownership,
};
