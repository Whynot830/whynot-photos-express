const { Router } = require('express')
const authMiddleware = require('../middleware/auth')
const controller = require('../controllers/image')
const upload = require('../utils/multer')

const router = Router()
router.use(authMiddleware)

router.route('/')
    .get(controller.getImagesData)
    .post(upload.single('image'), controller.upload)
    .delete(controller.deleteAll)

router.route('/:filename')
    .get(controller.getImageData)
    .delete(controller.delete)

module.exports = router