const { decode } = require('./jwt');
const { ErrorObject } = require('../helpers/error');

const ownership = async (req, res, next) => {
  try {
    const { id } = req.params;

    let token = req.headers.authorization.split(' ').pop();

    let tokenDecode = decode(token);
    if (tokenDecode.id == id || tokenDecode.roleId == 1) {
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
