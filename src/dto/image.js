module.exports = class ImageDTO {
    id
    filename
    createdAt

    constructor(model) {
        this.id = model._id
        this.filename = model.filename
        this.createdAt = model.createdAt
    }
}