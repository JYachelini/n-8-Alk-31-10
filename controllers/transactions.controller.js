const { ErrorObject, catchAsync, endpointResponse } = require('../helpers');
const { jwt } = require('../middlewares');
const { isAdmin } = require('../middlewares/auth');
const { transactionService } = require('../services');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { query, page = 0 } = req.query;
      const size = 10;
      const user = req.user;
      if (!isAdmin(user.roleId) && user.id != query) {
        throw new ErrorObject('Not allowed.', 403);
      }

      let response;
      let filter = {};
      if (query) {
        filter = { userId: query };
        response = await transactionService.list(filter, size, page);
      } else response = await transactionService.list(filter, size, page);

      const { transactions, pagesUrls } = response;

      const tokens = transactions.map((element) => jwt.encode(element));

      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: { pagesUrls, transactions: [...tokens] },
      });
    } catch (error) {
      next(error);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await transactionService.findById(id);

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
      const { categoryId, amount, date, description } = req.body;
      const user = req.user;
      const data = {
        userId: user.id,
        categoryId,
        amount,
        date,
        description,
      };
      const response = await transactionService.create(data);
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
      const { categoryId, amount, date } = req.body;
      const user = req.user;
      const { id } = req.params;
      const filter = { id };
      const data = { userId: user.id, categoryId, amount, date };
      const response = await transactionService.update(data, filter);
      if (!response[0] == 0)
        endpointResponse({
          res,
          message: 'Transactions retrieved successfully',
          body: response,
        });
      else
        throw new ErrorObject(
          'Transactions not found or nothing to change',
          422
        );
    } catch (error) {
      next(error);
    }
  }),

  remove: catchAsync(async (req, res, next) => {
    try {
      const { id } = req.params;

      const filter = { id };
      const response = await transactionService.remove(filter);
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
