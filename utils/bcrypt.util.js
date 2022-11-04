const bcrypt = require('bcrypt');

module.exports = {
  hashData: async (string, number = 10) => {
    const salt = await bcrypt.genSalt(number);
    return await bcrypt.hash(string, salt);
  },
  compareData: async (string, hash) => {
    return await bcrypt.compare(string, hash);
  },
};
