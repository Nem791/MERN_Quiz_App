var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo');

const db = 'mongodb://localhost:27017/quiz_db';
const connection = mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); 
var quizzesRouter = require('./routes/quiz'); 

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up express-session dung connect-mongo
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat",
    cookie: { maxAge: 8 * 60 * 60 * 1000 },
    store: MongoStore.create({
        mongoUrl: db
    })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quizzes', quizzesRouter);

module.exports = app;
