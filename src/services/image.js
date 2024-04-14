const ImageModel = require('../models/image')
const ImageDTO = require('../dto/image')
const ApiError = require('../errors/api')
const fs = require('fs')

class ImageService {
    async upload(userId, file) {
        const image = new ImageModel({
            userId,
            filename: file.filename,
            filePath: `uploads/${userId}/${file.filename}`,
            createdAt: Date.now()
        })
        const savedImage = await image.save()
        return new ImageDTO(savedImage)
    }
    async getImagesData(userId) {
        const images = await ImageModel.find({ userId })
        return images.map((image) => new ImageDTO(image))
    }
    async update() {

    }
    async delete(userId, filename) {
        console.log(userId, filename);
        const image = await ImageModel.findOneAndDelete({ userId, filename })
        if (!image)
            throw ApiError.EntityNotFoundError('Image not found')
        fs.unlink(image?.filePath, (err) => {
            if (err)
                console.log(`[WARNING]: File ${filename} was not found on storage`);
        })

    }
}

module.exports = new ImageService()