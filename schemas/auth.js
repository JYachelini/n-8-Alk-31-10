module.exports = {
  loginSchema: {
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
