const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { test, submitAnswers } = require('../controller/submitHistoryController');

// Test route
router.post('/test', checkToken, test);

// Tinh diem & luu score 
router.post('/calculate-quiz-score', checkToken, submitAnswers)

module.exports = router;