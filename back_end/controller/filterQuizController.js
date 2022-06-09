const { default: mongoose } = require('mongoose');
var path = require('path');

const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const randomNumers = require('../utils/randomNumers');
const toSlug = require('../utils/vietnamese-slug-converter');

const privateFilter = async (req, res) => {
    const filter = req.params.filter;
    let user = (req.user !== undefined) ? req.user : undefined;
    console.log(user);

    let quizzes;

    try {

        switch (filter) {
            case "createdByMe":
                quizzes = await QuizSet.find({ user: user._id });
                break;

            case "draftQuizzes":
                quizzes = await QuizSet.find({ user: user._id, draft: false });
                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error);
        return res.send({ error: String(error) });
    }

    return res.send(quizzes);
};


module.exports = {
    privateFilter
}