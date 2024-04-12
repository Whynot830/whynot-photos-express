const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ApiError = require('../errors/api')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = `uploads/${req.user.id}`
        if (!fs.existsSync(dest))
            fs.mkdirSync(dest, { recursive: true })
        cb(null, dest)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype))
        cb(null, true)
    else
        cb(ApiError.BadRequest('Invalid file type. Only JPEG, PNG and WEBP are supported'), false)
}
const upload = multer({
    storage,
    fileFilter
})

module.exports = upload