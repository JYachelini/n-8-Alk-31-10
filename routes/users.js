const express = require('express');
const { get, remove, update, create } = require('../controllers/users');
const { userCreate } = require('../schemas/userCreateSchema');

const { validatorId } = require('../schemas/userValidationId');

const { validator } = require('../middlewares/validator');

const router = express.Router();

router.get('/', get);
router.post('/', validator(userCreate), create);
router.delete('/:id', remove);
router.put('/:id', update);


module.exports = router;
