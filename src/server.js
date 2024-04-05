const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

const app = express()

const PORT = 5000
const url = 'mongodb+srv://whynot:whynotishe@cluster0.qk3ma4g.mongodb.net/cwdb?retryWrites=true&w=majority'

app.get('/', (req, res) => {
    res.json({ message: 'Server is working' })
})

app
    .use(cors())
    .use(express.json())
    .use(cookieParser())
    .use('/api/auth', authRouter)

mongoose.connect(url).then(() => {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}).catch(err => console.log(err))