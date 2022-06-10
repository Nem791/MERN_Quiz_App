var express = require('express');
const { getQuizzes } = require('../controller/quizController');
var router = express.Router();

/* GET home page. */
// Render trang home
router.get('/', getQuizzes);

module.exports = router;
