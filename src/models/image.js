const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    userId: String,
    filename: String,
    filePath: String,
    createdAt: Date,
    size: Number
})

module.exports = mongoose.models.images || mongoose.model('Image', ImageSchema)