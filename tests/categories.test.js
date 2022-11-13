const db = require('../database/models');
const { Category } = require('../database/models');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  await Category.destroy({ where: {}, force: true }).then(() => {});

  const category = {
    name: 'Incomes',
    description: '-',
  };

  await Category.create(category);
});

describe('get/get:id test suite', () => {
  it('should return categories - get', async () => {
    const { status } = await api.get('/categories');
    expect(status).toBe(200);
  });

  it('should return a category - get:id', async () => {
    const id = 1;
    const { status } = await api.get(`/categories/${id}`);
    expect(status).toBe(200);
  });

  it('should return any category - get:id', async () => {
    const id = 3;
    const { status } = await api.get(`/categories/${id}`);
    expect(status).toBe(404);
  });
});

describe('create - post - test suite', () => {
  it('should create a new category', async () => {
    const newCategory = {
      name: 'Outcomes',
      description: '-',
    };
    const { status } = await api.post('/categories').send(newCategory);
    expect(status).toBe(200);
  });
});

describe('put:id test suite', () => {
  it('should update a category', async () => {
    const id = 1;
    const updateCategory = {
      name: 'new name',
      description: 'new description',
    };
    const { status } = await api.put(`/categories/${id}`).send(updateCategory);
    expect(status).toBe(200);
  });

  it('should not update a category', async () => {
    const id = 3;
    const updateCategoryError = {
      name: 'new description',
      description: 'new description',
    };
    const { status } = await api
      .put(`/categories/${id}`)
      .send(updateCategoryError);
    expect(status).toBe(409);
  });
});

describe('detele:id test suite', () => {
  it('should delete a category', async () => {
    const id = 1;
    const { status } = await api.delete(`/categories/${id}`);
    expect(status).toBe(200);
  });

  it('should not delete a category', async () => {
    const id = 3;
    const { status } = await api.delete(`/categories/${id}`);
    expect(status).toBe(404);
  });
});
