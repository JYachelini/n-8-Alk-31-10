const { Router } = require('express');
const { authController } = require('../controllers');
const { authSchema, userSchema } = require('../schemas');
const { validator, upload } = require('../middlewares');

const router = Router();

router.post('/login', validator(authSchema.login), authController.login);
router.post(
  '/register',
  validator(userSchema.create),
  upload.single('avatar'),
  authController.register
);

module.exports = router;
