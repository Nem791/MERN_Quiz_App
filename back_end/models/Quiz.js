const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    answer: {
        type: String,
        required: true
    },
    set: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
});

const Quiz = mongoose.model('BlogPost', QuizSchema);
module.exports = Quiz;
