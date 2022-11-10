const express = require('express');
const { validator } = require('../middlewares');
const { categorySchema } = require('../schemas');
const { categoriesController } = require('../controllers');

const router = express.Router();
router.post('/', validator(categorySchema.create), categoriesController.create);
router.get('/', categoriesController.get);
router.get('/:id', categoriesController.getById);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.remove);

module.exports = router;
