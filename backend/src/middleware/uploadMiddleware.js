const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  }
});

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const maxImageSizeBytes = 5 * 1024 * 1024;

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
