const express = require('express');
const {
  get,
  getById,
  create,
  update,
  remove,
} = require('../controllers/transactions');
const { validator } = require('../middlewares/validator');
const { ownership } = require('../middlewares/ownership');
const { transactionsCreate } = require('../schemas/transactionsCreateSchema');
const router = express.Router();

router.get('/', ownership, get);
router.delete('/:id', remove);
router.get('/:id', getById);
router.put('/:id', validator(transactionsCreate), update);
router.post('/', validator(transactionsCreate), create);

module.exports = router;
