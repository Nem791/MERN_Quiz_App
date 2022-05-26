const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes } = require('../controller/quizController');

// Render trang home
router.get('/', checkToken, getQuizzes);

// Render trang info Post (Landing Page)
// router.get('/:id', checkToken, getPostById);

// Store post in DB 
// router.post('/store', checkToken, savePost);

module.exports = router;