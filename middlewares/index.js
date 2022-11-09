const jwt = require('./jwt');
const upload = require('./multer');
const { validator } = require('./validator');
// const { ownership } = require('./ownership');

module.exports = {
  jwt,
  upload,
  validator,
  // ownership,
};
