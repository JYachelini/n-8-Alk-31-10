const express = require('express');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');

const router = express.Router();

// example of a route with index controller get function
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
