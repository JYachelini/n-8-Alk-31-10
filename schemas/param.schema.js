module.exports = {
  validatorId: {
    id: {
      exists: {
        errorMessage: 'id is required',
      },
      isNumeric: {
        errorMessage: 'id must be a number',
      },
    },
  },
};
