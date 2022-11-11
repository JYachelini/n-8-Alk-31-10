'use strict';
const { faker } = require('@faker-js/faker');
module.exports = {
  up: async (queryInterface) => {
    const transactions = await createTransaction();
    //   [
    //   {
    //     userId: 1,
    //     categoryId: 1,
    //     amount: 204,
    //     date: '2022-06-06',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ];
    return await queryInterface.bulkInsert('Transactions', transactions, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transaction', null, {});
  },
};

function createTransaction() {
  const transactions = [];

  for (let i = 1; i <= 6; i++) {
    const transaction = {
      userId: 1,
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
