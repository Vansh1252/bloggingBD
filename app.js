var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./utilities/connection.js');
var userrouter = require('./routes/user.js');
var commentrouter = require('./routes/comment.js');
var articlesrouter = require('./routes/blog.js')
const dotenv = require('dotenv');

var app = express();

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!DATABASE_URL || !process.env.JWT_SECRET) {
  console.error("Missing environment variables. Please check DATABASE_URL and JWT_SECRET.");
  process.exit(1);
}
connectDB(DATABASE_URL);

app.use('/articles', articlesrouter);
app.use('/comments', commentrouter);
app.use('/users', userrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
