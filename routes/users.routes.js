const express = require('express');

const { userController } = require('../controllers');

const { userSchema, paramSchema } = require('../schemas');
const { validator, ownership, upload } = require('../middlewares');

const router = express.Router();

router.get('/', userController.get);
router.post(
  '/',
  upload.single('avatar'),
  validator(userSchema.create),
  userController.create
);
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
  ownership,
  userController.update
);

module.exports = router;
