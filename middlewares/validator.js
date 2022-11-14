const { checkSchema, validationResult } = require('express-validator');
const fs = require('fs');
const { ErrorObject } = require('../helpers/error');

module.exports = {
  validator: (schema) => {
    return [
      checkSchema(schema),
      (req, res, next) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) throw new ErrorObject(errors.mapped(), 400);
          next();
        } catch (error) {
          if (req.file)
            fs.unlink(req.file.path, (err) => {
              if (err) {
                next(new ErrorObject(err, 400));
              }
            });
          next(error);
        }
      },
    ];
  },
};
