const multer = require('multer');
const path = require('path');

const imagestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '..', '..', 'imagenes');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extension}`);
    }
});

const uploadimage = multer({ storage: imagestorage });

module.exports = uploadimage;