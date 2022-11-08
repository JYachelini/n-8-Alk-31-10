'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const users = generateUsers();
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

function generateUsers() {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
}
