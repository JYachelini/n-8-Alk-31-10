const { Transaction } = require('../database/models');

const getById = async (id) => {
  return await Transaction.findByPk(id, { raw: true });
};

module.exports = { getById };
