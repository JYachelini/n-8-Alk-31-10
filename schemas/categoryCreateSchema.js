module.exports = {
  categoryCreate: {
    name: {
      exists: {
        errorMessage: 'name is required',
      },
    },
    description: {
      exists: {
        errorMessage: 'description is required',
      },
    },
  },
};
