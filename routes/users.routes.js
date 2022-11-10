const express = require('express');

const { userController } = require('../controllers');

const { paramSchema, userSchema } = require('../schemas');
const { validator, ownership } = require('../middlewares');

const router = express.Router();

router.get('/', ownership, userController.get);
router.get(
  '/:id',
  validator(paramSchema.validatorId),
  ownership,
  userController.getById
);
router.delete(
  '/:id',
  validator(paramSchema.validatorId),
  ownership,
  userController.remove
);
router.put(
  '/:id',
  validator(paramSchema.validatorId),
  validator(userSchema.create),
  ownership,
  userController.update
);

module.exports = router;
