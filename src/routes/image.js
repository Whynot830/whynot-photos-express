const { Router } = require('express')
const authMiddleware = require('../middleware/auth')
const controller = require('../controllers/image')
const upload = require('../utils/multer')

const router = Router()

router.use(authMiddleware)
router.post('/', upload.single('image'), controller.upload)
router.get('/', controller.getImagesData)
router.get('/:filename', controller.getImage)

module.exports = router