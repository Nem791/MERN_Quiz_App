const { default: mongoose } = require('mongoose');
var path = require('path');

const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const Users = require('../models/Users');
const randomNumers = require('../utils/randomNumers');
const toSlug = require('../utils/vietnamese-slug-converter');

const privateFilter = async (req, res) => {
    const filter = req.params.filter;
    let user = (req.user !== undefined) ? req.user : undefined;
    console.log(user);

    let quizzes;

    try {

        // filter theo cac muc: 
        switch (filter) {
            case "createdByMe":
                quizzes = await QuizSet.find({ user: user._id });
                break;

            case "draftQuizzes":
                quizzes = await QuizSet.find({ user: user._id, draft: false });
                break;

            case "likedQuizzes":
                user = await Users.findById(user._id);
                await Users.populate(user, { path: "liked_quiz" });
                quizzes = user.liked_quiz;
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

const searchQuiz = async (req, res) => {
    const query = req.params.query;
    let additionQuery = req.query;

    // pipeline ban dau se match theo query 
    let pipeline = [{ $match: { title: { $regex: query, $options: 'i' } } }];

    // Filter theo tags
    if (additionQuery.tags) {
        // Unwind Array 
        pipeline.push({ $unwind: '$tags' });
        // Match vs tags 
        pipeline.push({ $match: { tags: additionQuery.tags } });
    }

    // Filter theo so luong cau hoi 
    if (additionQuery.size) {
        // console.log(additionQuery.size.split(','));

        // Modify query thanh` dang Array Number
        const range = additionQuery.size.split(',').map(number => {
            return Number(number);
        });

        console.log(range);
        pipeline.push({
            $match: {
                [`quizzes.${range[0]}`]: {
                    "$exists": true
                },
                [`quizzes.${range[1]}`]: {
                    "$exists": false
                }
            }
        })
    }

    if (additionQuery.sort) {
        switch (additionQuery.sort) {
            case 'date':
                // Sort theo ngay tao 
                pipeline.push({ $sort: { date_created: -1 } });
                break;
        
            default:
                break;
        }
    }

    // Tra ve ket qua 
    try {
        const result = await QuizSet.aggregate(pipeline);
        // await QuizSet.populate(result, { path: "user quizzes", select: '-password -_id -answer' });
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};


module.exports = {
    privateFilter,
    searchQuiz
}