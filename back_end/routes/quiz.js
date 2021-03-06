const express = require('express');
const router = express.Router();
const checkToken = require('../auth/checkToken');
const { getQuizzes, saveQuiz, getQuizSetById, test, getQuizzesForHomePage, getQuizSetByTag, saveQuizSet, saveQuizzes, updateDraft, saveQuizzesMock, softDeleteQuizSet, deleteQuizSet, deleteQuiz, getDeletedQuiz } = require('../controller/quizController');

// Render trang home
router.get('/', getQuizzesForHomePage);


// Test route
router.get('/test', checkToken, test);

// Render trang info Quiz (Landing Page)
router.get('/tags', getQuizSetByTag);

// Render trang info Quiz (Landing Page)
router.get('/:id', getQuizSetById);

// Store quiz in DB 
// router.post('/store', checkToken, saveQuiz);

// Store QuizSet in DB 
router.post('/store-quiz-set', checkToken, saveQuizSet);

// Store Quiz in DB 
router.post('/store-quiz', checkToken, saveQuizzes);

// Publish Quiz (draft = false) 
router.put('/update-draft', checkToken, updateDraft);

// Soft delete QuizSet 
router.delete('/soft-delete-quiz-set/:id', checkToken, softDeleteQuizSet);

// Delete QuizSet 
router.delete('/delete-quiz-set/:id', checkToken, deleteQuizSet);

// Delete Quiz
router.delete('/delete-quiz/:id', checkToken, deleteQuiz);

// Add mock data 
router.post('/add-mock', checkToken, saveQuizzesMock);

// Get deleted QuizSet 
router.get('/get-deleted-quiz-set/:id', checkToken, getDeletedQuiz);


module.exports = router;