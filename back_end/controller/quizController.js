const { default: mongoose } = require('mongoose');
var path = require('path');
const Quiz = require('../models/Quiz');
const QuizSet = require('../models/QuizSet');

const getQuizzes = async (req, res) => {

    try {
        // Find and populate
        const quizzes = await QuizSet.find({});
        // Join User vs QuizSet 
        await QuizSet.populate(quizzes, { path: "user" });
        console.log('lol');
        return res.json(quizzes);
    } catch (error) {
        console.log(error);
        return res.json({ error: String(error) });
    }
};

const test = async (req, res) => {
    const pageSize = 6;
    const page = Number(req.params.pageNumber) || 1;
    const sortParams = req.query.sortBy === undefined ? 'title' : 'datePosted';
    console.log('sortParams: ', sortParams);

    const pages = await BlogPost.countDocuments();
    let noOfPages = Math.ceil(pages / pageSize);

    const posts = await BlogPost.aggregate().sort(`${sortParams}`).skip(pageSize * (page - 1)).limit(pageSize);
    return res.json(posts);
};

// Lay post theo ID 
const getPostById = async (req, res) => {
    let username = (req.user !== undefined) ? req.user : undefined;

    try {
        console.log(req.params.id);
        // get ID
        const slug = req.params.id.split('-').pop();

        // Tim post theo ID 
        const post = await BlogPost.findById(slug);
        console.log('post: ', post);

        // Join User vs BlogPost 
        await BlogPost.populate(post, { path: "user" });

        return res.render('landing-page', { username, post });

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

        let quizIdArray = [];
        for (let index = 0; index < req.body.quizzes.length; index++) {
            const element = req.body.quizzes[index];
            element._id = new mongoose.Types.ObjectId();
            quizIdArray.push(element._id);
        }

        set = await QuizSet.create({
            ...setData,
            quizzes: quizIdArray,
            // _id: new mongoose.Types.ObjectId(),
            quiz_img: "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
            user: mongoose.Types.ObjectId(req.user._id)
        })

        // let newArray = req.body.quizzes.map(obj => ({ ...obj, set: set._id }));
        // console.log(newArray);

        // Gan ID cua Set cho tung Quiz 
        for (let index = 0; index < req.body.quizzes.length; index++) {
            const element = req.body.quizzes[index];
            element.set = set._id;
        }

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
    test,
    getPostById
}