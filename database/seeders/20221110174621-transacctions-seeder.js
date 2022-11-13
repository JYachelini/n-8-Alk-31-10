'use strict';

const { User } = require('../models');
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const transactions = await createTransaction();
    return await queryInterface.bulkInsert('Transactions', transactions, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};

async function users() {
  const users = await User.findAll();
  const count = users.length;
  return count;
}

function generateId(count) {
  return Math.floor(Math.random() * count);
}

async function createTransaction() {
  const transactions = [];
  const countUsers = await users();

  for (let i = 1; i <= 10; i++) {
    const transaction = {
      userId: generateId(countUsers) + 1,
      categoryId: 1,
      amount: faker.finance.amount(),
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    transactions.push(transaction);
  }
  return transactions;
}
