const { checkSchema, validationResult } = require('express-validator');
// const createHttpError = require("http-errors");

module.exports = {
  validator: (schema) => {
    return [
      checkSchema(schema),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.mapped() });
        }
        next();
      },
    ];
  },
};
