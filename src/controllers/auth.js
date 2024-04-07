const service = require('../services/auth')

class AuthController {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            if (!username || !email || !password)
                res.status(401).json({ message: "Some fields are empty" })
            else {
                await service.register(username, email, password)
                res.sendStatus(200)
            }

        } catch (err) {
            res.status(401).json({ message: err.message })
        }
    }
    async activate(req, res, next) {
        try {
            const { link } = req.params
            console.log(link);
            res.status(200).json({ link })
        } catch (err) { console.log(err) }
    }
    async login(req, res, next) {
        try {
            const { username, email, password } = req.body
            const userData = await service.login(username, email, password)
            res.status(200).json(userData)
        } catch (err) {
            res.status(401).json({ message: err.message })
        }
    }
    async getInfo(req, res, next) {
        try {
            res.status(200).json({ message: "getInfo endpoint" })
        } catch (err) { console.log(err) }
    }
    async refresh(req, res, next) {
        try {
            res.status(200).json({ message: "refresh endpoint" })
        } catch (err) { console.log(err) }
    }
    async logout(req, res, next) {
        try {
            res.sendStatus(204)
        } catch (err) { console.log(err) }
    }
}

module.exports = new AuthController()