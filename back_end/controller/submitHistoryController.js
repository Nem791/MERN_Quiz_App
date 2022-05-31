const { default: mongoose } = require('mongoose');
const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const UserAnswerHistory = require('../models/UserAnswerHistory');
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

    let username = (req.user !== undefined) ? req.user : undefined;
    let { answers } = req.body;

    for (const answer of answers) {
        answer.quiz = mongoose.Types.ObjectId(answer.quiz);
    }

    const userAnswers = await UserAnswerHistory.create(answers);
    console.log(userAnswers);
    await UserAnswerHistory.populate(userAnswers, { path: "quiz" });

    let countCorrectAnswer = 0;
    let totalQuizzes = userAnswers.length;

    for (const answer of userAnswers) {
        let rightAnswer;
        let submitAnswer;
        let question;
        switch (answer.quiz.type) {
            case "multiple_choice":
                rightAnswer = answer.quiz.answer[0].toLowerCase().trim();
                submitAnswer = answer.user_answers[0].toLowerCase().trim();
                if (rightAnswer === submitAnswer) {
                    countCorrectAnswer++;
                }
                break;

            case "fill_blank_1":
                rightAnswer = answer.quiz.answer;
                submitAnswer = answer.user_answers[0].toLowerCase().trim();
                let check = rightAnswer.some(a => a.toLowerCase().trim() === submitAnswer);
                if (check) {
                    countCorrectAnswer++;
                }
                break;

            case "fill_blank_2":
                rightAnswer = answer.quiz.answer;
                question = answer.quiz.question.split(' ');
                submitAnswer = answer.user_answers;

                for (let index = 0; index < submitAnswer.length; index++) {
                    const element = submitAnswer[index].toLowerCase().trim();
                    const match = question[rightAnswer[index]];
                    console.log(question);
                    console.log(rightAnswer[index]);
                    console.log("match: ", match);
                    if (element === match) {
                        countCorrectAnswer += 1 / rightAnswer.length;
                    }
                }
                break;

            case "multiple_choice_answers":
                rightAnswer = answer.quiz.answer;
                submitAnswer = answer.user_answers;
                for (const answer of submitAnswer) {
                    let check = rightAnswer.some(a => a.toLowerCase().trim() === answer.toLowerCase().trim());
                    if (check) {
                        countCorrectAnswer += 1 / rightAnswer.length;
                    }
                }
                break;

            default:
                break;
        }
    }

    return res.send({ userAnswers, username, score: (countCorrectAnswer / totalQuizzes) * 10 });
};

module.exports = {
    submitAnswers,
    test
}