const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSetSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quiz_img: {
        type: String,
        default: "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    completions: {
        type: Number,
        required: true,
        default: 0
    },
    date_created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    max_score: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: []
    },
    draft: {
        type: Boolean,
        default: true,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
        required: true
    },
    user_liked: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    
});

const QuizSet = mongoose.model('QuizSet', QuizSetSchema);
module.exports = QuizSet;
