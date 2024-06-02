const multer = require('multer')
const { memoryStorage } = multer

const ApiError = require('../errors/api')

const fileFilter = (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype))
        cb(null, true)
    else
        cb(ApiError.BadRequest('Invalid file type. Only JPEG, PNG and WEBP are supported'), false)
}
const upload = multer({
    storage: memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 5000000
    }
})

module.exports = upload