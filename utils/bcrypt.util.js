const bcrypt = require('bcrypt');

module.exports = {
  hashData: async (string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
  },
  compareData: async (string, hash) => {
    return await bcrypt.compare(string, hash);
  },
};
