module.exports = class UserDTO {
    id
    username
    email
    role

    constructor(model) {
        this.id = model.id
        this.username = model.username
        this.email = model.email
        this.role = model.role
    }
}