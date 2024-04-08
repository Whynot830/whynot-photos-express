const ApiError = require("../errors/api")

module.exports = (err, req, res, next) => {
    console.log({ message: err.message, ...err });

    if (err instanceof ApiError)
        return res.status(err.status).json({ message: err.message, errors: err.errors })

    return res.status(500).json({ message: 'Something went wrong' })
}