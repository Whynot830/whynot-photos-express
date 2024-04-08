const { Router } = require('express')
const controller = require('../controllers/auth')
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth')

const router = Router()

router.post('/register',
    body('username', 'Username should be between 4 and 15 characters')
        .isLength({ min: 4, max: 15 }),
    body('email', 'Incorrect email format')
        .isEmail(),
    body('password', 'Password should be between 6 and 32 characters')
        .isLength({ min: 6, max: 32 }),
    controller.register
)
router.get('/activate/:link', controller.activate)
router.post('/login', controller.login)
router.get('/info', authMiddleware, controller.getInfo)
router.post('/refresh', controller.refresh)
router.post('/logout', controller.logout)

module.exports = router

