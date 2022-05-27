const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes, saveQuiz, getQuizSetById, test, getQuizzesForHomePage } = require('../controller/quizController');

// Render trang home
router.get('/', checkToken, getQuizzesForHomePage);


// Test route
router.get('/test/:id', checkToken, test);

// Render trang info Quiz (Landing Page)
router.get('/:id', checkToken, getQuizSetById);

// Store quiz in DB 
router.post('/store', checkToken, saveQuiz);


module.exports = router;