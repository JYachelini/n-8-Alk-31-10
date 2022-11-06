const express = require('express');
const { validator } = require('../middlewares/validator');
const { categoryCreate } = require('../schemas/categoryCreateSchema');
const { get, getById, update, create } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', validator(categoryCreate), create);
router.put('/:id', update);

module.exports = router;
