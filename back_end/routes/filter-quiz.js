const express = require('express');
const checkToken = require('../auth/checkToken');
const { privateFilter } = require('../controller/filterQuizController');
const { getQuizzesForHomePage, likeFunction } = require('../controller/quizController');
const router = express.Router();

// Render trang home
router.get('/private/:filter', checkToken, privateFilter);

// Like & Unlike
router.put('/rating/:type', checkToken, likeFunction);

module.exports = router;