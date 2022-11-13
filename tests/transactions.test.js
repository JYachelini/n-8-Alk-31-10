const { jwt } = require('../middlewares');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const db = require('../database/models');
const { userService, categoryService } = require('../services');
const { hashData } = require('../utils/bcrypt.util');
const { User } = require('../database/models');

let category;
let transaction;
let transactionModify;
beforeAll(async () => {
  db.sequelize.sync({ logging: false });

  const mockUser = {
    firstName: 'user',
    lastName: 'User',
    email: 'mockuser@user.com',
    password: await hashData('12345678'),
    roleId: 2,
  };

  const search = await userService.find({ email: mockUser.email });

  if (!search) await User.create(mockUser);
  category = await categoryService.list();
  transaction = {
    categoryId: category[0].id,
    amount: 204,
    date: '2022-05-05',
  };

  transactionModify = {
    categoryId: category[0].id,
    amount: 204000,
    date: '2022-11-05',
  };
});

let idtransactionAdmin;

describe('POST Transactions', () => {
  it('Create transaction as admin', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    console.log(mockAdmin);
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send(transaction);

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
    const decodetoken = jwt.decode(body.body);
    idtransactionAdmin = decodetoken.id;
  });

  it('create transaction as User', async () => {
    const mockUser = await userService.find({ roleId: 2 });
    const token = `Bearer ${jwt.encode(mockUser)}`;
    const { body, status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send(transaction);

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });
});

describe('POST FAIL', () => {
  it('without authorization', async () => {
    const { body, status } = await api.post('/transactions').send(transaction);

    expect(status).toBe(403);
    expect(body.message).toContain('You must log in');
  });

  it('without body', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;

    const { status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send();

    expect(status).toBe(400);
  });

  it('without the category argument', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { amount, date } = transaction;

    const { status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send({ amount, date });

    expect(status).toBe(400);
  });

  it('without the amount argument', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { category, date } = transaction;

    const { body, status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send({ category, date });

    expect(status).toBe(400);
    expect(body.message.amount.msg).toContain('amount is required');
  });

  it('without the date argument', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { category, amount } = transaction;

    const { body, status } = await api
      .post('/transactions')
      .set({ Authorization: token })
      .send({ category, amount });

    expect(status).toBe(400);
    expect(body.message.date.msg).toContain('date is required');
  });
});

describe('GET Transactions', () => {
  it('list all transactions roleId Admin', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .get('/transactions')
      .set({ Authorization: token });

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });

  it('list all admin transactions passing the id by query', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const { id } = mockAdmin;
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .get(`/transactions?query=${id}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });

  it('admin requests to list all the transactions of a user passing the id by query', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const mockUser = await userService.find({ roleId: 2 });
    const { id } = mockUser;
    const { body, status } = await api
      .get(`/transactions?query=${id}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });

  it('user requests to list all its transactions', async () => {
    const mockUser = await userService.find({ roleId: 2 });
    const { id } = mockUser;
    const token = `Bearer ${jwt.encode(mockUser)}`;
    const { body, status } = await api
      .get(`/transactions?query=${id}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });
});

describe('GET FAIL', () => {
  it('without authorization', async () => {
    const { body, status } = await api.get('/transactions');

    expect(status).toBe(403);
    expect(body.message).toContain('You must log in');
  });

  it('disallow listing all transactions to a user', async () => {
    const mockUser = await userService.find({ roleId: 2 });
    const token = `Bearer ${jwt.encode(mockUser)}`;
    const { body, status } = await api
      .get('/transactions')
      .set({ Authorization: token });

    expect(status).toBe(403);
    expect(body.message).toContain('Not allowed.');
  });

  it('disallow a user to list another user transactions', async () => {
    const mockUser = await userService.find({ roleId: 2 });
    const mockAdmin = await userService.find({ roleId: 1 });
    const { id } = mockAdmin;
    const token = `Bearer ${jwt.encode(mockUser)}`;
    const { body, status } = await api
      .get(`/transactions?query=${id}`)
      .set({ Authorization: token });

    expect(status).toBe(403);
    expect(body.message).toContain('Not allowed.');
  });
});

describe('PUT Transaction', () => {
  it('modificar transaccion', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .put(`/transactions/${idtransactionAdmin}`)
      .set({ Authorization: token })
      .send(transactionModify);

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });
});

describe('PUT FAIL', () => {
  it('should return 404, error updating transaction', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .put(`/transactions/${0}`)
      .set({ Authorization: token })
      .send(transactionModify);

    expect(status).toBe(404);
    expect(body.message).toContain('Transaction not found');
  });
});

describe('DELETE Transaction', () => {
  it('delete transaction', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .delete(`/transactions/${idtransactionAdmin}`)
      .set({ Authorization: token });

    expect(status).toBe(200);
    expect(body.message).toContain('Transactions retrieved successfully');
  });
});

describe('DEELETE FAIL', () => {
  it('Fail delete transaction', async () => {
    const mockAdmin = await userService.find({ roleId: 1 });
    const token = `Bearer ${jwt.encode(mockAdmin)}`;
    const { body, status } = await api
      .delete(`/transactions/${0}`)
      .set({ Authorization: token });

    expect(status).toBe(404);
    expect(body.message).toContain('Transaction not found');
  });
});
