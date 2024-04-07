const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String,
    role: {
        type: String,
        default: 'user'
    }
})

module.exports = model('User', UserSchema)