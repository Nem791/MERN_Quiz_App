var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();


// const db = "mongodb://localhost:27017/quiz_db";
// const connection = mongoose.connect(db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = "mongodb+srv://root:ktqd1234@cluster0.gdomz.mongodb.net/quiz_db?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose blog mindx is connected")
  );
} catch (e) {
  console.log("could not connect");
}

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var quizzesRouter = require("./routes/quiz");
var submitRouter = require("./routes/submit");
var filterQuiztRouter = require("./routes/filter-quiz");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set up express-session dung connect-mongo
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat",
    cookie: { maxAge: 10000 },
    store: MongoStore.create({
      mongoUrl: db,
    }),
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.all

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/quizzes", quizzesRouter);
app.use("/submit", submitRouter);
app.use("/filter-quiz", filterQuiztRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;