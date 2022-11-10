const express = require('express');
const { transactionController } = require('../controllers');
const { validator, ownership } = require('../middlewares');
const { transactionSchema } = require('../schemas');
const router = express.Router();

router.get('/', ownership, transactionController.get);
router.delete('/:id', ownership, transactionController.remove);
router.get('/:id', ownership, transactionController.getById);
router.put(
  '/:id',
  validator(transactionSchema.create),
  ownership,
  transactionController.update
);
router.post(
  '/',
  validator(transactionSchema.create),
  transactionController.create
);

module.exports = router;
