const express = require('express');
const { get, create, remove } = require('../controllers/transactions');
const { validator } = require('../middlewares/validator');
const { transactionsCreate } = require('../schemas/transactionsCreateSchema');

const router = express.Router();

router.get('/', get);
router.post('/', validator(transactionsCreate), create);
router.delete('/:id', remove);

module.exports = router;
