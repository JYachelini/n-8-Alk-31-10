const { ErrorObject, catchAsync, endpointResponse } = require('../helpers');
const { categoryService } = require('../services');

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await categoryService.list();
      console.log(response);
      return endpointResponse({
        res,
        message: 'Categories retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),
  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await categoryService.findById(id);

      if (!response) throw new ErrorObject('Category not found', 404);
      endpointResponse({
        res,
        message: 'Category retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),
  create: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const data = { name, description };
      const response = await categoryService.create(data);

      endpointResponse({
        res,
        message: 'Category created successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),
  update: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const filter = { id };
      const data = { name, description };
      const response = await categoryService.update(data, filter);

      if (!response[0] == 0)
        endpointResponse({
          res,
          message: response,
        });
      else throw new ErrorObject('ID not found', 409);
    } catch (error) {
      next(error);
    }
  }),
  remove: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const filter = { id };
      const response = await categoryService.remove(filter);

      if (!response) throw new ErrorObject('ID not found', 404);
      endpointResponse({
        res,
        message: 'Category was deleted successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),
};
