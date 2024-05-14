const Router = require('express')
const router = new Router()
const specialistController = require('../controllers/specialistController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), specialistController.create)
router.get('/', specialistController.getAll)
router.get('/:id', specialistController.getOne)
router.put('/:id', checkRole('ADMIN'), specialistController.put)
router.delete('/:id', checkRole('ADMIN'), specialistController.delete)


module.exports = router