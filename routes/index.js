const { Router } = require('express');
const usersRouter = require('./users');
const transactionsRouter = require('./transactions');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');

const router = Router();

router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);

module.exports = router;
