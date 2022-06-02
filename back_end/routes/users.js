var express = require('express');
var router = express.Router();
const checkToken = require('../auth/checkToken');
const { getUsers, getUserById, registerUser, loginUser, userProfile, logOutUser, checkLoginStatus } = require('../controller/userController');

/* GET users listing. */
router.get("/", checkToken, getUsers);

router.get("/:id", checkToken, getUserById);

router.get("/profile/:id", checkToken, userProfile);

// Register 
router.post('/register', registerUser);

// Login 
router.post('/login', loginUser);

// Log Out 
router.get('/session/logout', logOutUser);

router.post('/check-login-status', checkToken, checkLoginStatus);

module.exports = router;
