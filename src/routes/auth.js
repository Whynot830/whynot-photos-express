const { Router } = require('express')
const controller = require('../controllers/auth')

const router = Router()

router.post('/register', controller.register)
router.get('/activate/:link', controller.activate)
router.post('/login', controller.login)
router.get('/info', controller.getInfo)
router.post('/refresh', controller.refresh)
router.post('/logout', controller.logout)

module.exports = router

