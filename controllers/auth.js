const { catchAsync } = require('../helpers/catchAsync');
const { User } = require('../database/models');
const bcrypt = require('../utils/bcrypt.util');
const { endpointResponse } = require('../helpers/success');
const { ErrorObject } = require('../helpers/error');
const { jwt } = require('../middlewares');

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({ where: { email }, raw: true });

      if (!userFound) throw new ErrorObject({ ok: false }, 401);

      const passwordMatchs = await bcrypt.compareData(
        password,
        userFound.password
      );

      if (!passwordMatchs) throw new ErrorObject({ ok: false }, 401);
      delete userFound.password;
      const token = jwt.encode(userFound);

      endpointResponse({
        res,
        message: 'Login successfully.',
        body: token,
      });
    } catch (error) {
      next(error);
    }
  }),
};
