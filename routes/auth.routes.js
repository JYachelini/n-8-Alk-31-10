const { Router } = require('express');
const { authController, userController } = require('../controllers');
const { authSchema, userSchema } = require('../schemas');
const { validator, upload } = require('../middlewares');

const router = Router();

router.post('/login', validator(authSchema.login), authController.login);
router.post(
  '/register',
  validator(userSchema.create),
  upload.single('avatar'),
  userController.create
);

module.exports = router;
