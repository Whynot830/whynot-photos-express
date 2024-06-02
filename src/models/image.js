const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    assetId: String,
    publicId: String,
    type: String,
    version: Number,
    createdAt: Date,
    filename: String,
    format: String,
    size: Number,
    url: String,
    userId: String,
})

module.exports = mongoose.models.images || mongoose.model('Image', ImageSchema)





