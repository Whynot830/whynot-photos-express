const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require("../models/user")
const UserDTO = require('../dto/user')
const mailService = require('./mail')
const tokenService = require('../services/token')
const ApiError = require('../errors/api')

class UserService {
    async register(username, email, password) {
        const exists = await UserModel.findOne({ $or: [{ username }, { email }] })
        if (exists)
            throw ApiError.BadRequest('Email/username already taken')

        const uid = uuid.v4()
        await mailService.sendActivationMail(email, uid)
        const hashedPassword = await bcrypt.hash(password, 3)

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
            throw ApiError.BadRequest('Invalid activation link')
        user.isActivated = true
        await user.save()
    }
    async login(username, email, password) {
        const user = await UserModel.findOne({ $or: [{ username }, { email }] })
        if (!user)
            throw ApiError.Unauthorized('User not found')
        try {
            const passwordMatched = await bcrypt.compare(password, user.password)

            if (!passwordMatched)
                throw ApiError.Unauthorized('Bad credentials')
            if (user.isActivated === false)
                throw ApiError.Unauthorized('User is not activated. Check your email')

            const userDto = new UserDTO(user)
            const tokens = tokenService.generateTokens({ ...userDto })
            return { user: { ...userDto }, tokens }
        } catch (err) {
            if (err instanceof ApiError)
                throw ApiError.Unauthorized(err.message)
            throw ApiError.Unauthorized('Bad credentials')
        }

    }
    async getInfo(id) {
        const user = await UserModel.findById(id)
        return new UserDTO(user)
    }
    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData)
            throw ApiError.Unauthorized('Refresh token expired')

        const user = await UserModel.findById(userData.id)
        if (!user)
            throw ApiError.Unauthorized('Invalid refresh token')

        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        return tokens
    }
}

module.exports = new UserService()