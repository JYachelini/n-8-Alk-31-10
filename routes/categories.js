const express = require('express');
const { validator } = require('../middlewares/validator');
const { categoryCreate } = require('../schemas/categoryCreateSchema');
const { create } = require('../controllers/categories');
const { get, getById } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', validator(categoryCreate), create);

module.exports = router;
