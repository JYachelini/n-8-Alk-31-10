'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('Categories', [
      {
        name: 'Incomes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Outcomes',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Categories', {}, null);
  },
};
