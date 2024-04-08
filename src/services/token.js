const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET)
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET)
        return { accessToken, refreshToken }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch (err) { return null }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }
        catch (err) { return null }
    }
}
module.exports = new TokenService()