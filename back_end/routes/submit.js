const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { test, submitAnswers } = require('../controller/submitHistoryController');

// Test route
router.get('/test', checkToken, test);

// Tinh diem & luu score 
router.post('/', checkToken, submitAnswers)

module.exports = router;