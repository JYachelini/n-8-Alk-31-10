const express = require('express');

const {
  get,
  remove,
  update,
  create,
  getById,
} = require('../controllers/users');

const { userCreate } = require('../schemas/userCreateSchema');
const { validatorId } = require('../schemas/userValidationId');
const { validator, ownership } = require('../middlewares');

const router = express.Router();

router.get('/', get);
router.post('/', validator(userCreate), create);
router.get('/:id', validator(validatorId), ownership, getById);
router.delete('/:id', validator(validatorId), ownership, remove);
router.put('/:id', validator(validatorId), ownership, update);

module.exports = router;
