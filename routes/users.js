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

const { validator } = require('../middlewares/validator');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', validator(userCreate), create);
router.delete('/:id',validator(validatorId), remove);
router.put('/:id',validator(validatorId), update);


module.exports = router;
