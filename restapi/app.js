var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/userRoute');
var cors = require('cors');
var bodyparser = require("body-parser");

var ConncetionDb = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tickeRoute = require("./routes/ticketRoute");
const { dirname } = require('path');
require('dotenv').config()

var app = express();

//Database
ConncetionDb();

//cors
app.use(cors());

//bodyparser
app.use(bodyparser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", tickeRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//server Fronted
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get('*', (req, res, next) => {
    res.sendFile(__dirname, '../', 'client', 'build', 'index.html')
  })
} else {
  app.get("/", (req, res,) => {
    res.status(200).json({ message: "Welcom to Tickets Helps" })
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
