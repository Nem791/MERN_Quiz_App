const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes, saveQuiz } = require('../controller/quizController');

// Render trang home
router.get('/', checkToken, getQuizzes);

// Render trang info Post (Landing Page)
// router.get('/:id', checkToken, getPostById);

// Store quiz in DB 
router.post('/store', checkToken, saveQuiz);

module.exports = router;