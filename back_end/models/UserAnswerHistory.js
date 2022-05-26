const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAnswerHistorySchema = new Schema({
    quiz_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Quiz"
    },
    user_answers: {
        type: String,
        required: true
    }
});

const UserAnswerHistory = mongoose.model('UserAnswerHistory', UserAnswerHistorySchema);
module.exports = UserAnswerHistory;
