const express = require('express');

const { userController } = require('../controllers');

const { paramSchema, userSchema } = require('../schemas');
const { validator, ownershipUser, checkAuth } = require('../middlewares');

const router = express.Router();

router.get('/', checkAuth, ownershipUser, userController.get);

router.get(
  '/:id',
  validator(paramSchema.validatorId),
  checkAuth,
  ownershipUser,
  userController.getById
);
router.delete(
  '/:id',
  validator(paramSchema.validatorId),
  checkAuth,
  ownershipUser,
  userController.remove
);
router.put(
  '/:id',
  validator(paramSchema.validatorId),
  validator(userSchema.create),
  checkAuth,
  ownershipUser,
  userController.update
);

module.exports = router;
