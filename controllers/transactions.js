const { Transaction } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');

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
};
