const { checkSchema, validationResult } = require('express-validator');
const { ErrorObject } = require('../helpers/error');

module.exports = {
  validator: (schema) => {
    return [
      checkSchema(schema),
      (req, res, next) => {
        try {
          const errors = validationResult(req);
        if (!errors.isEmpty())  throw new ErrorObject(errors.mapped(),400);
        next();
        } catch(error){
          next(error)
        }
      },
    ];
  },
};
