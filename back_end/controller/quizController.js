const { default: mongoose } = require('mongoose');
var path = require('path');
const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');
const randomNumers = require('../utils/randomNumers');
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

const getQuizzesForHomePage = async (req, res) => {
    try {

        // Lay tat ca tags cho vao 1 Array 
        // boundaries trong $bucket can phai duoc sort 
        const set = await QuizSet.distinct('tags').sort();

        // push them zz(gia tri lon nhat cua chuoi~) de gia tri 
        // cuoi cung khong bi vao truong hop default 
        set.push('zz');

        console.log(set);

        // Find and populate
        const quizzes = await QuizSet.aggregate([
            { $unwind: "$tags" },
            {
                $bucket: {
                    groupBy: "$tags",                  // Field to group by
                    boundaries: set,                              // Boundaries for the buckets
                    default: "zzzz_Other_Untagged_QuizSet",        // Bucket id for documents which do not fall into a bucket
                    output: {                                     // Output for each bucket
                        "quizzes":
                        {
                            $push: {
                                "title": "$title",
                                "type": "$type",
                                "quiz_img": "$quiz_img",
                                "user": "$user",
                                "completions": "$completions",
                                "tags": "$tags"
                            }
                        }
                    }
                }
            }
        ]);

        return res.json(quizzes);
    } catch (error) {
        console.log(error);
        return res.json({ error: String(error) });
    }
};

let lastId;

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

// Lay post theo ID 
const getQuizSetByTag = async (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;

    try {
        console.log(req.params.id);
        console.log(req.query.tags);
        console.log(req.query.load);
        console.log("lastId:", lastId);

        let tags = req.query.tags.toLowerCase();

        let quizzes;
        let pageNumber = Number(req.query.page);
        const limit = 1;

        if (pageNumber === 1 && pageNumber === undefined) {
            quizzes = await QuizSet.find({ $toLower: { tags: tags } }).limit(limit);

        } else {
            quizzes = await QuizSet.find().limit(limit).skip(limit * pageNumber);
        }

        // Join User vs QuizSet
        await QuizSet.populate(quizzes, { path: "user quizzes", select: '-password -_id' });

        return res.json(quizzes);

    } catch (error) {
        console.log(error);
        res.json({ error });
    }

};

// Lay post theo ID 
const getQuizSetById = async (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;

    try {
        console.log(req.params.id);
        // get ID
        const slug = req.params.id.split('-').pop();
        // mang-may-tinh-628f842398306d65e66cd0d9

        // Tim post theo ID 
        const quiz = await QuizSet.findById(slug);

        // Join User vs QuizSet
        await QuizSet.populate(quiz, { path: "user quizzes", select: '-password -user._id' });
        console.log('quiz: ', quiz.quizzes[0]);

        // Xu ly question type fill_blank_2 
        for (let index = 0; index < quiz.quizzes.length; index++) {
            const element = quiz.quizzes[index];
            let questionLength;

            if (element.type === 'fill_blank_2') {
                questionLength = element.question.split(' ').length - 1;
                for (let index = 0; index < randomNumers(1, 4); index++) {
                    element.options.push(randomNumers(0, questionLength));
                }
                element.answer = element.options;
            }
            
        }

        return res.json(quiz);

    } catch (error) {
        console.log(error);
        res.json({ error });
    }

};

const newPost = (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;
    res.render('create', { username: username });
};

const saveQuiz = async (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    console.log('req.user-', req.user);
    // let image = req.files.image;
    const { quizzes, ...setData } = req.body;

    // let set;

    // await image.mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
    //     set = QuizSet.create({
    //         ...setData,
    //         quiz_img: '/upload/' + image.name,
    //         user: mongoose.Types.ObjectId(req.user._id)
    //     }, function (err) {
    //         // res.redirect('/');
    //         console.log(err);
    //         return res.json(err)
    //     })
    // });


    let set;
    try {

        // Set ObjectId cho tung` Quiz sau do luu vao 1 array 
        let quizIdArray = [];
        for (let index = 0; index < req.body.quizzes.length; index++) {
            const element = req.body.quizzes[index];
            element._id = new mongoose.Types.ObjectId();
            quizIdArray.push(element._id);
        }

        // Tao QuizSet 
        set = await QuizSet.create({
            ...setData,
            quizzes: quizIdArray,
            quiz_img: "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
            user: mongoose.Types.ObjectId(req.user._id)
        })

        // Cach 2 de set ID (tao array moi) 
        // let newArray = req.body.quizzes.map(obj => ({ ...obj, set: set._id }));
        // console.log(newArray);

        // Gan ID cua Set cho tung Quiz 
        for (let index = 0; index < req.body.quizzes.length; index++) {
            const element = req.body.quizzes[index];
            element.set = set._id;
        }

        // Tao so cau hoi cua QuizSet 
        const quiz = await Quiz.create(req.body.quizzes);
        console.log("quiz: ", quiz);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }


    return res.json(set._id);
    // const quizList = await Quiz.create()
};

const recommendArticle = (req, res) => {
    const posts = BlogPost.aggregate();
}

module.exports = {
    getQuizzes,
    newPost,
    saveQuiz,
    getQuizSetById,
    getQuizzesForHomePage,
    getQuizSetByTag,
    test
}