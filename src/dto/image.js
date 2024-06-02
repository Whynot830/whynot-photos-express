module.exports = class ImageDTO {
    id
    filename
    createdAt
    size
    url
    format

    constructor(model) {
        this.id = model.assetId
        this.filename = model.filename
        this.createdAt = model.createdAt
        this.size = model.size
        this.url = model.url
        this.format = model.format
    }
}