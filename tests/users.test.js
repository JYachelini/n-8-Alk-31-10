const { User } = require('../database/models');
const { hashData } = require('../utils/bcrypt.util');
const supertest = require('supertest');

const db = require('../database/models');
const app = require('../app');
const { jwt } = require('../middlewares');
const { verify } = require('../middlewares/jwt');
const api = supertest(app);

beforeAll(async () => {
  db.sequelize.sync({ logging: false });

  await User.destroy({ where: {}, force: true }).then(function () {});

  const mockAdminUser = {
    firstName: 'administrator',
    lastName: 'administrator',
    email: 'mockAdmin@admin.com',
    password: await hashData('12345678'),
    roleId: 1,
  };

  await User.create(mockAdminUser);
});

let mockUserId = null;
let token = null;

describe('auth test suite', () => {
  it('should return a token', async () => {
    const adminCredentials = {
      email: 'mockAdmin@admin.com',
      password: '12345678',
    };

    const { body, status } = await api
      .post('/auth/login')
      .send(adminCredentials);

    token = `bearer ${body.body}`;

    expect(status).toBe(200);
  });

  it('should not return a token', async () => {
    const adminCredentials = {
      email: 'admin@admin.com',
      password: '12345678',
    };

    const { status } = await api.post('/auth/login').send(adminCredentials);

    expect(status).toBe(401);
  });

  it('should register a new user - post:id', async () => {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      password: '12345678',
    };

    const { body, status } = await api.post('/auth/register').send(newUser);

    mockUserId = await jwt.decode(body.body).id;

    expect(status).toBe(201);
  });

  it('should not register a new user - post:id', async () => {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      password: '12345678',
    };

    const { status } = await api.post('/auth/register').send(newUser);

    expect(status).toBe(400);
  });
});

describe('get/get:id test suite', () => {
  it('should return a user - get', async () => {
    const { status } = await api.get('/users').set({ Authorization: token });

    expect(status).toBe(200);
  });

  it('should not return any users - get', async () => {
    const { status } = await api.get('/users');

    expect(status).toBe(403);
  });

  it('should return a user - get:id', async () => {
    const pureToken = token.split(' ').pop();
    const { id } = verify(pureToken);

    const { status } = await api
      .get(`/users/${id}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
  });

  it('should not return any users - get:id', async () => {
    const pureToken = token.split(' ').pop();
    const { id } = verify(pureToken);

    const { status } = await api
      .get(`/users/${id}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
  });
});

describe('put:id test suite', () => {
  it('should update a user - put:id', async () => {
    const updatedUser = {
      firstName: 'User',
      lastName: 'Updated',
      email: 'userupdated@test.com',
      password: '12345678',
    };

    const { status } = await api
      .put(`/users/${mockUserId}`)
      .set({ Authorization: token })
      .send(updatedUser);

    expect(status).toBe(200);
  });

  it('should not update a user - put:id', async () => {
    const updatedUser = {
      firstName: 'User',
      lastName: 'Updated',
      email: 'userupdated@test.com',
      password: '12345678',
    };

    const { status } = await api.put(`/users/${mockUserId}`).send(updatedUser);

    expect(status).toBe(403);
  });
});

describe('delete:id test suite', function () {
  it('should delete a user - delete:id', async () => {
    const { status } = await api
      .delete(`/users/${mockUserId}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
  });

  it('should not delete a user - delete:id', async () => {
    const { status } = await api.delete(`/users/${mockUserId}`);

    expect(status).toBe(403);
  });
});
