const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes, saveQuiz, getQuizSetById, test, getQuizzesForHomePage, getQuizSetByTag } = require('../controller/quizController');

// Render trang home
router.get('/', getQuizzesForHomePage);


// Test route
router.get('/test', checkToken, test);

// Render trang info Quiz (Landing Page)
router.get('/tags', getQuizSetByTag);

// Render trang info Quiz (Landing Page)
router.get('/:id', getQuizSetById);

// Store quiz in DB 
router.post('/store', checkToken, saveQuiz);


module.exports = router;