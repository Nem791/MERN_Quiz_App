const { default: mongoose } = require('mongoose');
const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const toSlug = require('../utils/vietnamese-slug-converter');

const getQuizzes = async (req, res) => {

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
    try {
        console.log(req.params.id);
        console.log(req.query.tags);
        console.log(req.query.load);
        console.log("lastId:", lastId);

        let quizzes;

        if (req.query.load === undefined) {
            quizzes = await QuizSet.find().sort({
                _id: 1
            }).limit(1);

            lastId = quizzes[quizzes.length - 1]._id;

        } else {
            console.log('2');

            quizzes = await QuizSet.find({ _id: { $gt: lastId } }).sort({
                _id: 1
            }).limit(1);


            lastId = quizzes[quizzes.length - 1]._id;
        }

        return res.json(quizzes);

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};

module.exports = {
    getQuizzes,
    test
}