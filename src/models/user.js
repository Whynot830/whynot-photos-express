const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    isActivated: Boolean,
    activationLink: String,
    role: String
})

module.exports = model("User", UserSchema)