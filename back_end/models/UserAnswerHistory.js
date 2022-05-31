const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswerHistorySchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Quiz"
    },
    user_answers: {
        type: Array,
        required: true
    }
});

const UserAnswerHistory = mongoose.model('UserAnswerHistory', UserAnswerHistorySchema);
module.exports = UserAnswerHistory;
