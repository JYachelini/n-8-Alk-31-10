const createError = require('http-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSetup = require('./helpers/swagger');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const config = require('./config/config');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'tmp')));

app.use('/', indexRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || err;
  res.status(status).json({ message });
});

app.set('port', config.port);

module.exports = app;
