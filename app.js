var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var tokenUtil = require('./util/tokenUtil.js')
var statusCode = require('./util/enum/statusCode.js')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//全局拦截
app.use(function (req, res, next) {

  if (req.url != '/logistics/users/login' && req.url != '/') {
    let token = req.headers['auth-token'];
    console.log(req.headers, 'headers')
    if (!tokenUtil.checkToken(token)) {
      console.log("token失效！");
      res.json({
        status: statusCode.TOKEN_LOSR.code,
        msg: statusCode.TOKEN_LOSR.description
      })
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/logistics', indexRouter);
app.use('/logistics/users', usersRouter);
app.use('/logistics/menu', menuRouter);

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
