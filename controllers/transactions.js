const { Transaction } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { ErrorObject } = require('../helpers/error');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll();
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: response,
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
};