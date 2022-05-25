const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz = new Schema({
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
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;
