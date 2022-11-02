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
      const response = await User.destroy({
        where: { id: req.params.id },
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
        `[Error deleting users] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
