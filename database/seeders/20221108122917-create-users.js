'use strict';
const { faker } = require('@faker-js/faker');
const { hashData } = require('../../utils/bcrypt.util');

module.exports = {
  up: async (queryInterface) => {
    async function getRoleId(role) {
      const roleId = await queryInterface.rawSelect(
        'Roles',
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
    const users = await generateUsers(admin);
    const userAdmin = await generateUsers(user);
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Users', userAdmin, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

async function generateUsers(admin) {
  const users = [];
  const passwordHash = await hashData('12345678');

  if (admin === 1) {
    users.push({
      firstName: 'administrator',
      lastName: 'administrator',
      email: 'admin@admin.com',
      password: passwordHash,
      roleId: admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  for (let i = 1; i <= 10; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: passwordHash,
      roleId: admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
  }
  return users;
}
