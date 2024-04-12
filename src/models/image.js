const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    userId: String,
    filename: String,
    filePath: String,
    createdAt: Date,
    // updatedAt: Date  
})

module.exports = mongoose.models.images || mongoose.model('Image', ImageSchema)