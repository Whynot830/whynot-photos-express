const cld = require('cloudinary').v2
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const imageRouter = require('./routes/image')
const errorMiddleware = require('./middleware/error')

cld.config({
    secure: true,
    cloud_name: process.env.CLD_CLOUD_NAME,
    api_key: process.env.CLD_API_KEY,
    api_secret: process.env.CLD_API_SECRET
})

const app = express()

const PORT = 5000

app.get('/', (req, res) => {
    res.json({ message: 'Server is working' })
})

app
    .use(cors())
    .use(express.json())
    .use(cookieParser())
    .use('/api/auth', authRouter)
    .use('/api/images', imageRouter)
    .use(errorMiddleware)

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}).catch(err => {
    console.error(err)
    process.exit(1)
})