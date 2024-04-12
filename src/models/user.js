const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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

module.exports = mongoose.models.users || mongoose.model('User', UserSchema)