const multer = require('multer')

// file upload
const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            let ext = file.originalname.split('.')[1];
            let fname = file.fieldname + "-" + Date.now() + "." + ext
            req['filename'] = fname
            cb(null, fname);
        }
    })
}).single('file');

module.exports = uploadFile