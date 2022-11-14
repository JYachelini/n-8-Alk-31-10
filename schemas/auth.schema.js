module.exports = {
  login: {
    email: {
      exists: {
        errorMessage: 'Email is required.',
      },
    },
    password: {
      exists: {
        errorMessage: 'Password is required.',
      },
    },
  },
};
