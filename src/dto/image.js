module.exports = class ImageDTO {
    id
    filename
    filePath
    createdAt
    size
    
    constructor(model) {
        this.id = model._id
        this.filename = model.filename
        this.filePath = model.filePath
        this.createdAt = model.createdAt
        this.size = model.size
    }
}