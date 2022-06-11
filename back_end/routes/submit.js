const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { test, submitAnswers, saveHistory } = require('../controller/submitHistoryController');

// Test route
router.post('/test', checkToken, test);

// Tinh diem & luu score 
router.post('/calculate-quiz-score', checkToken, submitAnswers);

// Luu score tong + quizSet
router.post('/save-history', checkToken, saveHistory);

module.exports = router;