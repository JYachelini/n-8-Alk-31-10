const { User } = require('../database/models');

module.exports = {
  list: async (attributes, page, size) => {
    return await User.findAll({
      attributes,
      limit: size,
      offset: page * size,
    });
  },
};
