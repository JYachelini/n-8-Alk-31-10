'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    async function getRoleId(role) {
      const roleId = await queryInterface.rawSelect(
        'roles',
        {
          where: {
            name: role,
          },
        },
        ['id']
      );
      return roleId;
    }
    const admin = await getRoleId('Administrator');
    const user = await getRoleId('User');
    const users = generateUsers(admin);
    const userAdmin = generateUsers(user);
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('users', userAdmin, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

function generateUsers(admin) {
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
  }
  return users;
}
