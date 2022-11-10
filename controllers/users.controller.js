const { User } = require('../database/models');
const fs = require('fs');
const bcrypt = require('../utils/bcrypt.util');
const { jwt } = require('../middlewares');
const {
  paginationUrls,
  ErrorObject,
  catchAsync,
  endpointResponse,
} = require('../helpers');
const { url } = require('../config/config');

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { page = 0 } = req.query;
      const size = 10;
      const response = await User.findAll({
        attributes: ['firstName', 'lastName', 'email', 'createdAt'],
        limit: size,
        offset: page * size,
      });
      const tokens = response.map((user) => jwt.encode(user.dataValues));
      const pagesUrl = await paginationUrls(User, page);

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: {
          pagesUrl,
          users: [...tokens],
        },
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await User.findByPk(id, { raw: true });

      if (!response) throw new ErrorObject('User not found', 404);
      delete response.password;
      const token = jwt.encode(response);

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: token,
      });
    } catch (error) {
      next(error);
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;

      password = await bcrypt.hashData(password, 10);
      let avatar = null;
      if (req.file) {
        avatar = `${url}/uploads/${req.file.filename}`;
      }
      const [response, created] = await User.findOrCreate({
        attributes: {
          exclude: ['password'],
        },
        where: {
          email,
        },
        defaults: {
          firstName,
          lastName,
          email,
          avatar,
          password,
        },
      });

      if (!created) {
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
        message: 'Success.',
        body: token,
      });
    } catch (error) {
      next(error);
    }
  }),

  remove: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await User.destroy({
        where: { id },
      });
      if (response) {
        endpointResponse({
          res,
          message: 'User deleted successfully',
          body: response,
        });
      } else {
        throw new ErrorObject('id not found ', 400);
      }
    } catch (error) {
      next(error);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;
      password = await bcrypt.hashData(password);
      const { id } = req.params;
      const response = await User.update(
        { firstName, lastName, email, password },
        {
          where: { id },
        }
      );
      if (!response[0] == 0) {
        endpointResponse({
          res,
          message: 'Users updated successfully',
          body: response,
        });
      } else {
        throw new ErrorObject('id not found or nothing to change', 400);
      }
    } catch (error) {
      next(error);
    }
  }),
};
