const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes, saveQuiz, getQuizSetById, test } = require('../controller/quizController');

// Render trang home
router.get('/', checkToken, getQuizzes);


// Test route
router.get('/test', checkToken, test);

// Render trang info Quiz (Landing Page)
router.get('/:id', checkToken, getQuizSetById);

// Store quiz in DB 
router.post('/store', checkToken, saveQuiz);


module.exports = router;