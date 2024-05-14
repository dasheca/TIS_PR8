const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);


router.get('/allservice', userController.getAllRegistrations);
router.delete('/registrations/:registrationId', checkRole('ADMIN'), userController.deleteRegistration);
router.get('/checkByEmail/:email', userController.checkByEmail);
router.post('/signupforservice', userController.SignUpForService)

module.exports = router;
