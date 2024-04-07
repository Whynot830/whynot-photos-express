module.exports = class UserDTO {
    id
    username
    role

    constructor(model) {
        this.id = model.id
        this.username = model.username
        this.role = model.role
    }
}