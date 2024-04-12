module.exports = class ImageDTO {
    id
    filename

    constructor(model) {
        this.id = model._id
        this.filename = model.filename
    }
}