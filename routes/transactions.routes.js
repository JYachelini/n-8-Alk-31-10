const express = require('express');
const { transactionController } = require('../controllers');
const {
  validator,
  checkAuth,
  ownershipTransaction,
} = require('../middlewares');
const { transactionSchema } = require('../schemas');
const router = express.Router();

// Create transaction
router.post(
  '/',
  validator(transactionSchema.create),
  checkAuth,
  transactionController.create
);

// Get transactions
router.get('/', checkAuth, transactionController.get);

// Get transaction
router.get(
  '/:id',
  checkAuth,
  ownershipTransaction,
  transactionController.getById
);

// Update transaction
router.put(
  '/:id',
  validator(transactionSchema.create),
  checkAuth,
  ownershipTransaction,
  transactionController.update
);

// Delete transaction
router.delete(
  '/:id',
  checkAuth,
  ownershipTransaction,
  transactionController.remove
);

module.exports = router;
