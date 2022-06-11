const mongoose = require('mongoose');
const QuizSet = require('./QuizSet');
const Schema = mongoose.Schema;

const UserQuestionHistorySchema = new Schema({
    quiz_set_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    user_answers: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserAnswerHistory"
    }],
    finishedAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    duration: {
        type: String
    }
});

// Them so luong nguoi dung da lam` quiz (field completions cua QuizSet)
UserQuestionHistorySchema.post('save', function(doc){
    var completion = QuizSet.findById(this.quiz_set_id).exec().then((quizset) => {
        quizset.completions++;
        quizset.save();
    });
});

const UserQuestionHistory = mongoose.model('UserQuestionHistory', UserQuestionHistorySchema);
module.exports = UserQuestionHistory;
