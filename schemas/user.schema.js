module.exports = {
  create: {
    firstName: {
      exists: {
        errorMessage: 'firstName is required',
      },
    },
    lastName: {
      exists: {
        errorMessage: 'lastName is required',
      },
    },
    email: {
      exists: {
        errorMessage: 'email is required',
      },
      isEmail: {
        errorMessage: 'email is invalid',
      },
    },
    password: {
      exists: {
        errorMessage: 'password is required',
      },
    },
  },
};
