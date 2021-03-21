const multer = require('multer');
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${path.join(__dirname, `../uploads/avatars`)}`);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').replace('.','_');
    const extension = MIME_TYPES[file.mimetype];
    const fullName = name + Date.now() + '.' + extension;
    callback(null, fullName);
  }
});

module.exports = multer({storage: storage}).single('avatar-upload');