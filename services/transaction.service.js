const { paginationUrls } = require('../helpers');
const { Transaction } = require('../database/models');

const list = async (filter, size, page) => {
  const transactions = await Transaction.findAll({
    where: filter,
    raw: true,
    limit: size,
    offset: page * size,
  });

  const pagesUrls = await paginationUrls(Transaction, page, filter);
  return { transactions, pagesUrls };
};

const findById = async (id) => {
  return await Transaction.findByPk(id, { raw: true });
};

const create = async (data) => {
  return await Transaction.create(data);
};

const update = async (data, filter) => {
  return await Transaction.update(data, { where: filter });
};

const remove = async (filter) => {
  return await Transaction.destroy({ where: filter });
};

module.exports = { list, findById, create, update, remove };
