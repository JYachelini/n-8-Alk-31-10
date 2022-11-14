const bcrypt = require('../utils/bcrypt.util');
const { ErrorObject, endpointResponse, catchAsync } = require('../helpers');
const { jwt } = require('../middlewares');
const { userService } = require('../services');

const { url } = require('../config/config');
const fs = require('fs');

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const filter = { email };
      const userFound = await userService.find(filter);

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
  register: catchAsync(async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;
      const file = req.file;
      let avatar = null;
      if (file) avatar = `${url}/uploads/${file.filename}`;
      password = await bcrypt.hashData(password, 10);

      const user = { firstName, lastName, email, password, avatar };
      console.log(user);

      const [response, created] = await userService.create(user);

      if (!created) {
        if (file)
          fs.unlink(req.file.path, (err) => {
            if (err) {
              next(new ErrorObject(err, 400));
            }
          });

        throw new ErrorObject('User or email already exist.', 400);
      }

      const token = jwt.encode(response.dataValues);

      endpointResponse({
        res,
        code: 201,
        message: 'Success.',
        body: token,
      });
    } catch (error) {
      next(error);
    }
  }),
};
