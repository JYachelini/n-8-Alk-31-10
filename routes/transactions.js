const express = require('express');
const { get, getById, create } = require('../controllers/transactions');
const { validator } = require('../middlewares/validator');
const { transactionsCreate } = require('../schemas/transactionsCreateSchema');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', validator(transactionsCreate), create);

module.exports = router;
