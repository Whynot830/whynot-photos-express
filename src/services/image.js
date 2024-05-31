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
            createdAt: Date.now(),
            size: file.size
        })
        const savedImage = await image.save()
        return new ImageDTO(savedImage)
    }
    async getImagesData(userId, filename) {
        if (!!filename) {
            const image = await ImageModel.findOne({ userId, filename })
            if (!image)
                throw ApiError.EntityNotFound('Image not found')
            return new ImageDTO(image)
        }
        const images = await ImageModel.find({ userId }).sort({ createdAt: -1 })
        return images.map((image) => new ImageDTO(image))
    }
    async delete(userId, filename) {
        const image = await ImageModel.findOneAndDelete({ userId, filename })
        if (!image)
            throw ApiError.EntityNotFound('Image not found')
        fs.unlink(image?.filePath, (err) => {
            if (err)
                console.log(`[WARNING]: File ${filename} was not found on storage`);
        })

    }
    async deleteAll(userId) {
        const images = await ImageModel.find({ userId })
        if (images.length === 0)
            return

        images.forEach(async (image) => {
            await ImageModel.findByIdAndDelete({ _id: image._id })
            fs.unlink(image?.filePath, (err) => {
                if (err)
                    console.log(`[WARNING]: File ${image?.filename} was not found on storage`);
            })
        })
    }
}

module.exports = new ImageService()