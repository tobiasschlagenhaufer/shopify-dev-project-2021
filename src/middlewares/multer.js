const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ 
  storage: storage,
  limits: { fileSize: (process.env.MAX_IMAGE_SIZE * 1000 * 1000) }
}).single('file');

function uploadSingle (req, res, next) {
  return upload(req, res, (error) => {
    if (error && error.code == 'LIMIT_FILE_SIZE') {
      // console.log(error);
      return next(new ApiError(httpStatus.BAD_REQUEST, "File exceeds " + process.env.MAX_IMAGE_SIZE + " MB"));
    }
    if (error) {
      console.log(error);
      return next(new ApiError(httpStatus.BAD_REQUEST, error.code));
    }
    return next();
  });
} 

module.exports = uploadSingle;