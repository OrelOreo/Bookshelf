const multer = require('multer')

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
}
const mconfig = (directory) => multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, directory)
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname
        const name = fileName.substring(0, fileName.lastIndexOf('.')) 
        const extension = MIME_TYPES[file.mimetype]
        callback(null, name + Date.now() + '.' + extension)
    }
})


module.exports = {
    uploadBookImage: multer({ storage: mconfig('images') }).single('image'),
    uploadAvatar: multer({ storage: mconfig('avatars') }).single('image')
}