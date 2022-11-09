const { Transaction } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require('../helpers/error');
const { paginationUrls } = require('../helpers/pagination');
const { jwt } = require('../middlewares');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { query, page = 0 } = req.query;
      const size = 10;
      let response;
      if (query)
        response = await Transaction.findAll({
          where: { userId: query },
          raw: true,
          limit: size,
          offset: page * size,
        });
      else
        response = await Transaction.findAll({
          raw: true,
          limit: size,
          offset: page * size,
        });

      const tokens = response.map((element) => jwt.encode(element));
      const pagesUrls = await paginationUrls(Transaction, page);
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: { pagesUrls, tokens },
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Transaction.findByPk(id, { raw: true });

      if (!response) throw new ErrorObject('Transaction not found', 404);
      const token = jwt.encode(response);
      endpointResponse({
        res,
        message: 'Transaction retrieved successfully',
        body: token,
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
      const token = jwt.encode(response.dataValues);
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: token,
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
