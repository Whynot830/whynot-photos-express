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
    .get((req, res, next) => {
        if (req.query.data)
            return controller.getImageData(req, res, next)
        return controller.getImage(req, res, next)
    })
    .put(controller.update)
    .delete(controller.delete)

module.exports = router