// este archivo se tomo de la documentacion de multer para subir archivos
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '..', '..', 'frontend', 'profileimages');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage: storage });



module.exports = upload;