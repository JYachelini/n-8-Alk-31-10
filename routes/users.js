const express = require('express');
const {
  get,
  remove,
  update,
  create,
  getById,
} = require('../controllers/users');
const { userCreate } = require('../schemas/userCreateSchema');
const { validator } = require('../middlewares/validator');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', validator(userCreate), create);
router.delete('/:id', remove);
router.put('/:id', update);

module.exports = router;
