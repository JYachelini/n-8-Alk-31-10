const { User } = require('../database/models');

const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

let token = null;

it('should return a token', async () => {
  const adminCredentials = {
    email: 'admin@admin.com',
    password: '12345678',
  };

  const { body } = await api.post('/auth/login').send(adminCredentials);

  token = `bearer ${body.body}`;

  expect(body.message).toContain('Login successfully');
});

it('should return all users', async () => {
  const { body } = await api.get('/users');

  expect(body.message).toContain('Users retrieved successfully');
});

it('should return a user', async () => {
  const { id } = await User.findOne({ raw: true });

  const { body } = await api.get(`/users/${id}`).set({ Authorization: token });

  expect(body.message).toContain('User retrieved successfully');
});

it('should register a new user', async () => {
  await User.destroy({ where: { firstName: 'Test' }, force: true });

  const newUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@test.com',
    password: '12345678',
  };

  const { body } = await api.post('/users').send(newUser);

  expect(body.message).toContain('Success');
});

it('should update a user', async () => {
  await User.destroy({ where: { firstName: 'User' }, force: true });

  const updatedUser = {
    firstName: 'User',
    lastName: 'Updated',
    email: 'userupdated@test.com',
    password: '12345678',
  };

  const { id } = await User.findOne({ where: { roleId: 2 }, raw: true });

  const { body } = await api
    .put(`/users/${id}`)
    .set({ Authorization: token })
    .send(updatedUser);

  expect(body.message).toContain('User updated successfully');
});

it('should delete a user', async () => {
  const { id } = await User.findOne({ where: { roleId: 2 }, raw: true });

  const { body } = await api
    .delete(`/users/${id}`)
    .set({ Authorization: token });

  expect(body.message).toContain('User deleted successfully');
});
