const ImageModel = require('../models/image')
const upload = require('../utils/multer')
const ImageDTO = require('../dto/image')

class ImageService {
    async upload(userId, file) {
        upload.single('image')
        const image = new ImageModel({
            userId,
            filename: file.filename,
            filePath: `uploads/${userId}/${file.filename}`
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
    async delete() {

    }
}

module.exports = new ImageService()