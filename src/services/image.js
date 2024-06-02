const ImageModel = require('../models/image')
const ImageDTO = require('../dto/image')
const ApiError = require('../errors/api')
const fs = require('fs')
const cld = require('cloudinary').v2

class ImageService {
    async upload(userId, file) {
        if (!file)
            throw ApiError.BadRequest('No file is present')

        const base64 = Buffer.from(file.buffer).toString('base64')
        const dataUri = `data:${file.mimetype};base64,${base64}`

        const { asset_id, public_id, type, version, created_at, original_filename, format, bytes, secure_url } = await cld.uploader.upload(
            dataUri,
            {
                filename_override: file.originalname,
                folder: `wnph_uploads/${userId}`
            })

        const image = new ImageModel({
            assetId: asset_id,
            publicId: public_id,
            type,
            version,
            createdAt: created_at,
            filename: original_filename,
            format,
            size: bytes,
            url: secure_url,
            userId
        })
        const savedImage = await image.save()
        return new ImageDTO(savedImage)
    }
    async getImagesData(userId, assetId) {
        if (!!assetId) {
            const image = await ImageModel.findOne({ userId, assetId })
            if (!image)
                throw ApiError.EntityNotFound('Image not found')
            return new ImageDTO(image)
        }
        const images = await ImageModel.find({ userId }).sort({ createdAt: -1 })
        return images.map((image) => new ImageDTO(image))
    }
    async delete(userId, assetId) {
        const image = await ImageModel.findOneAndDelete({ userId, assetId })
        if (!image)
            throw ApiError.EntityNotFound('Image not found')

        await cld.api.delete_resources([image.publicId], { type: 'authenticated' })
    }
    async deleteAll(userId) {
        const images = await ImageModel.find({ userId })
        if (images.length === 0)
            return
        
        await cld.api.delete_resources_by_prefix(`wnph_uploads/${userId}`, { type: 'authenticated' })

        const deletePromises = images.map(image => ImageModel.findByIdAndDelete(image._id))
        await Promise.all(deletePromises)
    }
}

module.exports = new ImageService()