const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'fotografia') {
            cb(null, 'uploads/images'); // Directorio para las imágenes
        } else if (file.fieldname === 'audiofile') {
            cb(null, 'uploads/audio'); // Directorio para los archivos de audio
        } else {
            cb({ error: 'Unexpected field' }, false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB límite de tamaño de archivo
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'fotografia' || file.fieldname === 'audiofile') {
            cb(null, true);
        } else {
            cb({ error: 'Unexpected field' }, false);
        }
    }
}).fields([
    { name: 'fotografia', maxCount: 1 },
    { name: 'audiofile', maxCount: 1 }
]);

module.exports = upload;
