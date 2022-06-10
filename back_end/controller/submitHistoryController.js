const { default: mongoose } = require('mongoose');
const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const UserAnswerHistory = require('../models/UserAnswerHistory');
const UserQuestionHistory = require('../models/UserQuestionHistory');
const { markMultipleChoice, markFillBlank1, markFillBlank2, markMultipleChoiceAnswers } = require('../utils/mark');
const toSlug = require('../utils/vietnamese-slug-converter');

const submitAnswers = async (req, res) => {

    try {
        // Find and populate
        const quizzes = await QuizSet.find({});
        // Join User vs QuizSet (bo field password & _id)
        await QuizSet.populate(quizzes, { path: "user", select: '-password -_id' });

        // console.log(toSlug(quizzes[1].title) + "-" + quizzes[1]._id);

        console.log('lol');
        return res.json(quizzes);
    } catch (error) {
        console.log(error);
        return res.json({ error: String(error) });
    }
};

const test = async (req, res) => {

    console.log('gg');

    let user = req.user;
    let { answers } = req.body;

    // for (const answer of answers) {
    //     answer.quiz = mongoose.Types.ObjectId(answer.quiz);
    // }

    const userAnswers = await UserAnswerHistory.create(answers);
    await UserAnswerHistory.populate(userAnswers, { path: "quiz" });
    console.log(userAnswers[0].quiz);

    let countCorrectAnswer = 0;
    let totalQuizzes = userAnswers.length;

    for (const answer of userAnswers) {
        console.log(answer);

        let rightAnswer;
        let submitAnswer;
        let question;
        switch (answer.quiz.type) {
            case "multiple_choice":
                rightAnswer = answer.quiz.answer[0].toLowerCase().trim();
                submitAnswer = answer.user_answers[0].toLowerCase().trim();

                countCorrectAnswer += markMultipleChoice(rightAnswer, submitAnswer)
                break;

            case "fill_blank_1":
                rightAnswer = answer.quiz.answer;
                submitAnswer = answer.user_answers[0].toLowerCase().trim();

                countCorrectAnswer += markFillBlank1(rightAnswer, submitAnswer)
                break;

            case "fill_blank_2":
                rightAnswer = answer.misc;
                question = answer.quiz.question.split(' ');
                submitAnswer = answer.user_answers;

                countCorrectAnswer += markFillBlank2(rightAnswer, submitAnswer, question)
                break;

            case "multiple_choice_answers":
                rightAnswer = answer.quiz.answer;
                submitAnswer = answer.user_answers;

                countCorrectAnswer += markMultipleChoiceAnswers(rightAnswer, submitAnswer);
                break;

            default:
                break;
        }
    }

    let user_id = user._id;
    let score = (countCorrectAnswer / totalQuizzes) * 10;
    let quiz_set_id = userAnswers[0].quiz._id;
    let user_answers = [];

    console.log(userAnswers);

    for (const iterator of userAnswers) {
        user_answers.push(iterator._id);
    }

    const doc = await UserQuestionHistory.create({user_id, score, quiz_set_id, user_answers});

    return res.send({ doc });
};

module.exports = {
    submitAnswers,
    test
}