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
                                "_id": "$_id",
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

const updateDraft = async (req, res) => {
    let setData = req.body;
    try {
        const set = await QuizSet.findByIdAndUpdate({ _id: setData._id }, { draft: false }, { new: true });
        return res.send(set);
    } catch (error) {
        console.log(error);
        return res.send({ error });
    }
};

const saveQuizSet = async (req, res) => {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    let files = req.files;

    let setData = req.body;

    // return res.send(req.files);
    // return res.send(files.image.data.toString('base64'));

    let set;
    try {
        // Neu co _id => Update 
        // Ko co _id => Tao moi
        if (!setData._id) {
            setData._id = new mongoose.Types.ObjectId().toString();
        }
        console.log("setData._id---: ", setData._id);

        let { _id, ...updatedData } = setData;

        if (files) {
            // Convert image duoi dang string base64 
            // let quiz_img = files.image.data.toString('base64');
            // setData = { ...setData, quiz_img };

            let image = files.image;

            await image.mv(path.join(__dirname, '..', '/public/images/', image.name), function (error) {
                updatedData = { ...updatedData, quiz_img: '/images/' + image.name };
                console.log("updatedData: ", updatedData);
            });

            console.log("set: ", set);
            return res.json(set);
        }


        let queryData = { $set: updatedData };
        console.log('gggggg');
        console.log("setData._id:", setData._id);

        set = await QuizSet.findByIdAndUpdate(
            { _id: setData._id },
            queryData,
            // set the new option to true to get the doc that was created by the upsert
            { upsert: true, new: true }
        ).clone();

    } catch (error) {
        console.log('Final error');
        console.log(error);
        return res.json(error);
    }

    console.log('End');
    return res.json(set);
    // return res.json(set._id);
    // const quizList = await Quiz.create()
};


const saveQuizzes = async (req, res) => {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    let files = req.files;
    let setData = req.body;

    // console.log(files);
    // for (var key in files) {
    //     console.log(key, ' - ', files[key]);
    // }
    // Câu trả lời là a1_1 a1_2... là ảnh answer 1, ảnh answer 2... của q1

    // return res.send(files.image.data.toString('base64'));

    let set;
    try {

        // Neu co _id => Update 
        // Ko co _id => Tao moi
        if (!setData._id) {
            setData._id = new mongoose.Types.ObjectId();
        }

        console.log("setData._id: ", setData._id);
        const { _id, ...updatedData } = setData;
        updatedData.set = mongoose.Types.ObjectId(updatedData.set);

        let queryData = { $set: updatedData };
        console.log(queryData);

        set = await Quiz.findByIdAndUpdate(
            { _id: setData._id },
            queryData,
            { upsert: true, new: true }
        ).clone();

    } catch (error) {
        console.log('Final error');
        console.log(error);
        return res.json(error);
    }

    console.log('End');
    return res.json(set);
    // return res.json(set._id);
    // const quizList = await Quiz.create()
};

const recommendArticle = (req, res) => {
    const posts = BlogPost.aggregate();


}

module.exports = {
    getQuizzes,
    newPost,
    getQuizSetById,
    getQuizzesForHomePage,
    getQuizSetByTag,
    saveQuizSet,
    saveQuizzes,
    updateDraft,
    test
}