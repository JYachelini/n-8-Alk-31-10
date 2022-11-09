const { User } = require('../database/models');
const bcrypt = require('../utils/bcrypt.util');
const { jwt } = require('../middlewares');
const {
  paginationUrls,
  ErrorObject,
  catchAsync,
  endpointResponse,
} = require('../helpers');
const { userService } = require('../services');

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { page = 0 } = req.query;
      const size = 10;
      const attributes = ['firstName', 'lastName', 'email', 'createdAt'];
      const response = await userService.list(attributes, page, size);
      if (!response) throw new ErrorObject('Error searching users', 500);
      const tokens = response.map((user) => jwt.encode(user.dataValues));

      const pagesUrl = await paginationUrls(User, page);

      endpointResponse({
        res,
        message: 'Users retrieved successfully',
        body: {
          pagesUrl,
          tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await userService.find(id);
      if (!response) throw new ErrorObject('User not found', 404);
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
      const user = { firstName, lastName, email, password };

      const [response, created] = await userService.create(user);
      if (!created) throw new ErrorObject('User or email already exist.', 400);
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
      const response = await userService.remove(id);
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
      const { id } = req.params;
      password = await bcrypt.hashData(password);
      const data = { firstName, lastName, email, password };
      const response = await userService.update(data, id);
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
