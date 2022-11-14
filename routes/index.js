const { Router } = require('express');
const usersRouter = require('./users.routes');
const transactionsRouter = require('./transactions.routes');
const categoriesRouter = require('./categories.routes');
const authRouter = require('./auth.routes');

const router = Router();

router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);

module.exports = router;
