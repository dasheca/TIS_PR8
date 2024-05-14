const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const serviceRouter = require('./serviseRouter')
const specialistRouter = require('./specialistRouter')

router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/specialist', specialistRouter)


module.exports = router