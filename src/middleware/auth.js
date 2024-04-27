const ApiError = require('../errors/api')
const tokenService = require('../services/token')
const UserModel = require('../models/user')

module.exports = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData)
            return next(ApiError.Unauthorized())

        UserModel.findById(userData.id).then(user => {
            if (!user)
                return next(ApiError.Unauthorized())

            req.user = user
            next()
        })
    }
    catch (e) {
        return next(ApiError.Unauthorized)
    }
}