const cloudinary = require('cloudinary').v2;
require('dotenv/config');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const validate = require('../../validation/validate');
const { postSchema, loginSchema } = require('../../validation/schema');
function checkType(req, res, next) {
  if (req.files) {
    let file = req.files.photo;
    let mimeRegex = /image\/jpeg|image\/png/gi;
    let isImage = mimeRegex.test(file.mimetype);

    if (!isImage) req.body.error += ' only images allowed';
  }
  next();
}
function checkSize(req, res, next) {
  if (req.files) {
    let file = req.files.photo;
    if (file.size > 2 * 1024 * 1024)
      return res
        .status(400)
        .json(
          req.body.error +
            ' size limit exceeded upload files, can not be larger than 2MB',
        );
    return cloudinary.uploader.upload(file.tempFilePath, function(err, data) {
      if (err) {
        req.body.error += ' there seems to be an issue with your network';
        return res.status(400).json(req.body.error);
      }

      req.body.imageUrl = data.secret_url;
      next();
    });
  }
  if (req.body.error) return res.status(400).json(req.body.error);

  next();
}
function checkUser(req, res, next) {
  const userSchema = postSchema;
  const error = validate(req.body, userSchema);
  req.body.error = '';
  if (error) req.body.error = error;
  next();
}
function checkLoginDetails(req, res, next) {
  const schema = loginSchema;
  const error = validate(req.body, schema);
  if (error) return res.status(400).json(error);
  next();
}

module.exports = { checkType, checkSize, checkUser, checkLoginDetails };
