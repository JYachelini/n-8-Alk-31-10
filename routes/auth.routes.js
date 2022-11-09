const { Router } = require('express');
const { authController } = require('../controllers');
const { authSchema } = require('../schemas');
const { validator } = require('../middlewares');

const router = Router();

router.post('/login', validator(authSchema.login), authController.login);

module.exports = router;
