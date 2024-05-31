module.exports = (res, tokens) => {
    res.cookie('accessToken', tokens.accessToken, { maxAge: process.env.ACCESS_COOKIE_MAX_AGE, httpOnly: true, secure: true, sameSite: 'none', path: '/' })
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: process.env.REFRESH_COOKIE_MAX_AGE, httpOnly: true, secure: true, sameSite: 'none', path: '/' })
}