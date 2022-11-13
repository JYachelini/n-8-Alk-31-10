const { Category } = require('../database/models');

const list = async () => {
  return await Category.findAll();
};

const findById = async (id) => {
  return await Category.findByPk(id);
};

const create = async (data) => {
  return await Category.create(data);
};

const update = async (data, filter) => {
  return await Category.update(data, { where: filter });
};

const remove = async (filter) => {
  return await Category.destroy({ where: filter });
};

module.exports = { list, findById, create, update, remove };
