const { Transaction } = require('../database/models');
const {
  paginationUrls,
  ErrorObject,
  catchAsync,
  endpointResponse,
} = require('../helpers');
const { jwt } = require('../middlewares');
const { isAdmin } = require('../middlewares/auth');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const { query, page = 0 } = req.query;
      const size = 10;
      let response;
      let pagesUrls;
      const user = req.user;
      if (!isAdmin(user.roleId) && user.id != query) {
        throw new ErrorObject('Not allowed.', 403);
      }

      if (query) {
        response = await Transaction.findAll({
          where: { userId: query },
          raw: true,
          limit: size,
          offset: page * size,
        });
        pagesUrls = await paginationUrls(Transaction, page, {
          userId: query,
        });
      } else {
        response = await Transaction.findAll({
          raw: true,
          limit: size,
          offset: page * size,
        });
        pagesUrls = await paginationUrls(Transaction, page, {});
      }

      const tokens = response.map((element) => jwt.encode(element));

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
      const response = await Transaction.findByPk(id, { raw: true });

      if (!response) throw new ErrorObject('Transaction not found', 204);
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
      const { category, amount, date } = req.body;
      const user = req.user;
      const response = await Transaction.create({
        userId: user.id,
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
          422
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
