const createHttpError = require("http-errors");
const { User } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await User.findAll();
      endpointResponse({
        res,
        message: "Users retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving users] - [index - GET]: ${error.message}`
      );
      next(httpError);
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
          message: "Users deleted successfully",
          body: response,
        });
      } else {
        res.status(400).json({ message: "id not found " });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting users] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      const data = req.body;
      const { id } = req.params;
      const response = await User.update(data, {
        where: { id },
        returning: true,
        plain: true,
      });
      console.log(response);
      if (!response[0] == 0) {
        endpointResponse({
          res,
          message: "Users updated successfully",
          body: response,
        });
      } else {
        res.status(400).json({ message: "id not found or nothing to change " });
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
