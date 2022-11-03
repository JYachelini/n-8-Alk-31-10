'use strict';

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert('Roles', [
      {
        name: 'Administrator',
        description: 'Unlimited permissions.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User',
        description: 'Limited permissions.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Roles', null, {});
  },
};
