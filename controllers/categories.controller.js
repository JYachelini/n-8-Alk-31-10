const { Category } = require('../database/models');
const { ErrorObject, catchAsync, endpointResponse } = require('../helpers');

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll();
      endpointResponse({
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
      const response = await Category.findByPk(id);

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
      const response = await Category.create({
        name,
        description,
      });

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

      const response = await Category.findByPk(id);

      if (!response) throw new ErrorObject('ID not found', 422);

      await response.update({ name, description });

      endpointResponse({
        code: 201,
        res,
        message: response,
      });
    } catch (error) {
      next(error);
    }
  }),
  remove: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Category.destroy({
        where: {
          id,
        },
      });
      if (!response) throw new ErrorObject('ID not found', 422);
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
