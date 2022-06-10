const express = require('express');
const checkToken = require('../auth/checkToken');
const { privateFilter, searchQuiz } = require('../controller/filterQuizController');
const { getQuizzesForHomePage, likeFunction } = require('../controller/quizController');
const router = express.Router();

// Render trang home
router.get('/private/:filter', checkToken, privateFilter);

// Search Quiz 
router.get('/search/:query', searchQuiz);

// Like & Unlike
router.put('/rating/:type', checkToken, likeFunction);

module.exports = router;