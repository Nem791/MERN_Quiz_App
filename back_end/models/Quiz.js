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
        type: Array,
        required: true
    },
    answer: {
        type: Array,
        required: true
    },
    set: {
        type: Schema.Types.ObjectId,
        ref: 'QuizSet'
    },
    date_created: {
        type: Date,
        default: Date.now(),
        required: true
    },
    timer: {
        type: Number,
        required: true
    }
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
