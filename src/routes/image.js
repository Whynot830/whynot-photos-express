const { Router } = require('express')
const authMiddleware = require('../middleware/auth')
const controller = require('../controllers/image')
const upload = require('../utils/multer')

const router = Router()


router.route('/')
    .get(authMiddleware, controller.getImagesData)
    .post(authMiddleware, upload.single('image'), controller.upload)
    .delete(authMiddleware, controller.deleteAll)


// Static serving (NGINX analog)
router.route('/:userId/:filename')
    .get(controller.getImage)

router.route('/:filename')
    .get(authMiddleware, (req, res, next) => {
        if (req.query.data)
            return controller.getImageData(req, res, next)
        return controller.getImage(req, res, next)
    })
    .delete(authMiddleware, controller.delete)

module.exports = router