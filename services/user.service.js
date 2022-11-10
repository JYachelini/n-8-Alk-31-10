const { User } = require('../database/models');

module.exports = {
  list: async (attributes, page, size) => {
    const userList = await User.findAll({
      attributes,
      limit: size,
      offset: page * size,
    });
    delete userList.password;
    return userList;
  },
  find: async (id) => {
    return await User.findByPk(id, { raw: true });
  },
  create: async (user) => {
    const [response, created] = await User.findOrCreate({
      where: {
        email: user.email,
      },
      attributes: {
        exclude: ['password'],
      },
      defaults: user,
    });

    return [response, created];
  },
  update: async (data, id) => {
    return await User.update(data, { where: { id } });
  },
  remove: async (id) => {
    return await User.destroy({
      where: { id },
    });
  },
};
