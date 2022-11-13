module.exports = {
  create: {
    categoryId: {
      exists: {
        errorMessage: 'category is required',
      },
      isInt: {
        errorMessage: 'id must be a number',
      },
    },
    amount: {
      exists: {
        errorMessage: 'amount is required',
      },
      isFloat: {
        errorMessage: 'amount must be a float',
      },
    },
    date: {
      exists: {
        errorMessage: 'date is required',
      },
      isISO8601: {
        errorMessage: 'date must be a date format ISO8601',
      },
    },
  },
};
