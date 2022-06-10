const moongose = require('mongoose');
const Schema = moongose.Schema;
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_img: {
        type: String,
        default: 'https://construct-static.com/images/v1007/r/uploads/tutorial/0/images/17449/windows-8-user-account_v650.jpg'
    },
    nickname: {
        type: String
    },
    birthday: {
        type: Date
    },
    liked_quiz: [{
        type: Schema.Types.ObjectId,
        ref: "QuizSet"
    }]

});

// UserSchema.pre('save', function (next) {
//     const user = this;
//     bcrypt.hash(user.password, 10, (error, hash) => {
//         user.password = hash;
//         next();
//     })
// });

module.exports = mongoose.model('User', UserSchema);
