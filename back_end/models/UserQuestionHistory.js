const mongoose = require('mongoose');
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

const UserQuestionHistory = mongoose.model('UserQuestionHistory', UserQuestionHistorySchema);
module.exports = UserQuestionHistory;
