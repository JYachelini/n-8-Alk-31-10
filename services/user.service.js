const { User } = require('../database/models');
const { paginationUrls } = require('../helpers');

const list = async (attributes, page, size) => {
  const userList = await User.findAll({
    attributes,
    limit: size,
    offset: page * size,
    raw: true,
  });
  delete userList.password;

  const pagesUrl = await paginationUrls(User, page);
  return { userList, pagesUrl };
};

const findById = async (id) => {
  return await User.findByPk(id, { raw: true });
};

const find = async (filter) => {
  return await User.findOne({ where: filter, raw: true });
};

const create = async (user) => {
  const [response, created] = await User.findOrCreate({
    where: {
      email: user.email,
    },
    defaults: user,
  });
  delete response.dataValues.password;

  return [response, created];
};

const update = async (data, id) => {
  return await User.update(data, { where: { id } });
};

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

module.exports = {
  list,
  findById,
  find,
  create,
  update,
  remove,
};
