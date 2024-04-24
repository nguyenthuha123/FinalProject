var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var authRouter = require('./routes/auth'); 
var departmentRouter = require('./routes/department'); 
var docummentRouter = require('./routes/documment'); 
// var categorybreakRouter = require('./routes/categorybreak');
var categorybreakRouter = require('./routes/Categorybreak'); 
var app = express();

//config bcrypt
var session = require('express-session'); 
const timeout = 1000000 * 60 * 60 * 24; 
app.use(session({
  secret: "practice_makes_perfect", 
  saveUninitialized: false, 
  cookie: {maxAge: timeout}, 
  resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//khai bao locals
app.use((req, res, next) =>{
  res.locals.username = req.session.username; 
  res.locals.email = req.session.email; 
  res.locals.address = req.session.address; 
  res.locals.department = req.session.department; 
  res.locals.role = req.session.role;
  next(); 
})
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/department', departmentRouter);
app.use('/account', accountRouter); 
app.use('/documment', docummentRouter);
app.use('/categorybreak', categorybreakRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//confign database
var monggoose = require('mongoose'); 
var database = "mongodb://127.0.0.1:27017/finalproject"; 
monggoose.connect(database)
.then(()=>console.log('connect to database succeed'))
.catch((err) => console.log('connect to database fail.error: ' +err))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
