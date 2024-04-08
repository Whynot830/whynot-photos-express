const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require("../models/user")
const UserDTO = require('../dto/user')
const mailService = require('./mail')
const tokenService = require('../services/token')

class UserService {
    async register(username, email, password) {
        const exists = await UserModel.findOne({ $or: [{ username }, { email }] })
        if (exists)
            throw Error('Email/username already taken')

        const hashedPassword = await bcrypt.hash(password, 3)
        const uid = uuid.v4()
        await mailService.sendActivationMail(email, uid)

        const user = new UserModel({
            username,
            email,
            password: hashedPassword,
            activationLink: uid
        })
        const savedUser = await user.save()
        return savedUser
    }
    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        if (!user)
            throw Error('Invalid activation link')

        user.isActivated = true
        await user.save()
    }
    async login(username, email, password) {
        const user = await UserModel.findOne({ $or: [{ username }, { email }] })
        if (!user)
            throw Error('User not found')

        try {
            const passwordMatched = await bcrypt.compare(password, user.password)
            if (!passwordMatched)
                throw Error('Bad credentials')

            const userDto = new UserDTO(user)
            const tokens = tokenService.generateTokens({ ...userDto })
            return tokens
        } catch (err) { throw Error('Bad credentials') }

    }
    async getInfo(id) {

    }
    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData)
            throw Error('Invalid refresh token')

        const tokens = tokenService.generateTokens({ ...userData })
        return tokens
    }
}

module.exports = new UserService()