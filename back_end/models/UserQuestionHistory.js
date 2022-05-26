// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserQuestionHistorySchema = new Schema({
//     quiz_set_id: {
//         type: Schema.Types.ObjectId,
//         required: true
//     },
//     score: [{
//         type: Number,
//         required: true
//     }],
//     user_id: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     quiz_img: {
//         type: String,
//         default: "https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
//     },
//     user_answers: [{
//         type: Array,
//         required: true,
//         default: 0
//     }],
//     date_created: {
//         type: Date,
//         default: Date.now(),
//         required: true
//     },
//     tags: {
//         type: Array,
//         required: true
//     },
//     max_score: {
//         type: Number,
//         default: 0
//     },
//     comments: {
//         type: Array,
//         default: []
//     }
// });

// const QuizSet = mongoose.model('QuizSet', UserQuestionHistorySchema);
// module.exports = QuizSet;
