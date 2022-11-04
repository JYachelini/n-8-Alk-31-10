const { User } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const bcrypt = require('../utils/bcrypt.util');
const { ErrorObject } = require('../helpers/error');

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll({
        attributes: ['firstName', 'lastName', 'email', 'createdAt'],
      });

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: response,
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

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;

      password = await bcrypt.hashData(password, 10);

      const [response, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      if (!created) throw new ErrorObject('user or email already exist', 400);
      endpointResponse({
        res,
        message: 'success',
        body: response,
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
          message: 'Users deleted successfully',
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
