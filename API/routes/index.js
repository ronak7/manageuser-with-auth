const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/auth')
const uploadFile = require('../middleware/uploadFile')

const userController = require("../controller/userController");
const authController = require('../controller/authController');

router.get('/', (req, res) => res.json({ status: true, msg: "API is running." }))
// authentication process
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// user routes
router.get('/user', authenticateToken, userController.getAllUserData);
router.get('/loggedinuserdata', authenticateToken, userController.loggedInUserData);
router.post('/user', [authenticateToken, uploadFile], userController.addUserData);
router.put('/user/:id', [authenticateToken, uploadFile], userController.updateUserData);
router.get('/user/:id', authenticateToken, userController.getUserData);
router.delete('/user/:id', authenticateToken, userController.deleteUserData);
router.post('/filteruser', authenticateToken, userController.filterUser);
router.get('/changeuserstatus/:id/:status', authenticateToken, userController.changeUserStatus);

module.exports = router