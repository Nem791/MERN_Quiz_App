var express = require('express');
const checkToken = require('../auth/checkToken');
const { getQuizzes } = require('../controller/quizController');
var router = express.Router();

/* GET home page. */
// Render trang home
router.get('/', checkToken, getQuizzes);

module.exports = router;
