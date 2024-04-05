class AuthController {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            console.log(username, email, password);
            res.status(200).json({ username, email, password })
        } catch (err) { console.log(err) }
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
            console.log(username, email, password);
            res.status(200).json({ username, email, password })
        } catch (err) { console.log(err) }
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