const multer = require('multer');
const { ErrorObject } = require('../helpers/error');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = './tmp';
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = '.' + file.mimetype.split('/').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/svg' ||
      file.mimetype == 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new ErrorObject('Only PNG/JPG/SVG/WEBP format allowed!', 403));
    }
  },
});

module.exports = upload;
