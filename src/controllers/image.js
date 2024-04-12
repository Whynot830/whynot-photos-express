const ApiError = require('../errors/api')
const service = require('../services/images')

class ImageController {
    async upload(req, res, next) {
        try {
            const { id } = req.user
            const savedImage = await service.upload(id, req.file)
            return res.status(201).json(savedImage)
        } catch (err) { next(err) }
    }
    async getImagesData(req, res, next) {
        try {
            const { id } = req.user
            const images = await service.getImagesData(id)
            return res.json(images)
        } catch (err) { next(err) }
    }
    async getImage(req, res, next) {
        try {
            const { id } = req.user;
            const { filename } = req.params;
            return res.sendFile(`/${id}/${filename}`, { root: 'uploads' }, (err) => {
                if (err?.status === 404)
                    return next(ApiError.EntityNotFoundError('Image not found'))
                return next(err)
            })
        } catch (err) { next(err) }
    }
    async update(req, res, next) {
        try {
            const { id } = req.user
        } catch (err) { next(err) }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.user
        } catch (err) { next(err) }
    }
}

module.exports = new ImageController()