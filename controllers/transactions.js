const { Transaction } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require('../helpers/error');
const { paginationUrls } = require('../helpers/pagination')
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { query, page = 0 } = req.query;
      const size = 10;
      if (query) {
        const response = await Transaction.findAll({
          where: {
            userId: query,
          },
        });

        return endpointResponse({
          res,
          message: 'Transactions retrieved successfully',
          body: response,
        });
      }

      const pagesUrls = await paginationUrls(Transaction,page)
      const response = await Transaction.findAll({
        limit: size,
        offset: page * size,
      });

      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: {
          pagesUrls,
          response,
        },
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Transaction.findByPk(id);

      if (!response) throw new ErrorObject('Transaction not found', 404);
      endpointResponse({
        res,
        message: 'Transaction retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),

  create: catchAsync(async (req, res, next) => {
    try {
      const { user, category, amount, date } = req.body;

      const response = await Transaction.create({
        userId: user,
        categoryId: category,
        amount,
        date,
      });
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),

  update: catchAsync(async (req, res, next) => {
    try {
      const { user, category, amount, date } = req.body;
      const { id } = req.params;
      const response = await Transaction.update(
        {
          userId: user,
          categoryId: category,
          amount,
          date,
        },
        {
          where: { id },
        }
      );
      if (!response[0] == 0) {
        endpointResponse({
          res,
          message: 'Transactions retrieved successfully',
          body: response,
        });
      } else {
        throw new ErrorObject(
          'Transactions not found or nothing to change',
          400
        );
      }
    } catch (error) {
      next(error);
    }
  }),

  remove: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Transaction.destroy({
        where: {
          id,
        },
      });
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: response,
      });
    } catch (error) {
      next(error);
    }
  }),
};
