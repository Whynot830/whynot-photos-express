const ApiError = require('../errors/api')
const tokenService = require('../services/token')
const UserModel = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData)
            return next(ApiError.UnauthorizedError())

        UserModel.findById(userData.id).then(user => {
            if (!user)
                return next(ApiError.UnauthorizedError())

            req.user = user
            next()
        })
    }
    catch (e) {
        return next(ApiError.UnauthorizedError)
    }
}