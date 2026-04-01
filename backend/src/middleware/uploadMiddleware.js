const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const maxImageSizeBytes = 5 * 1024 * 1024;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mini-social-posts',
    resource_type: 'image',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp']
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new Error('Invalid image type. Allowed: PNG, JPG, JPEG, WEBP'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxImageSizeBytes
  }
});

module.exports = upload;
module.exports.maxImageSizeBytes = maxImageSizeBytes;
module.exports.allowedMimeTypes = allowedMimeTypes;
