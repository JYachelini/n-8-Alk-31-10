const express = require('express');
const { validator } = require('../middlewares/validator');
const { categoryCreate } = require('../schemas/categoryCreateSchema');
const { create } = require('../controllers/categories');
const { get } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.post('/', validator(categoryCreate), create);

module.exports = router;
