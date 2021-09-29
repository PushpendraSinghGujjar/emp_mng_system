var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminLoginRouter  =require('./routes/adminLogin');
var adminDashboardRoute = require('./routes/adminDashboard');
var addEmployeeRoute = require('./routes/addEmployee');
var viewAllEmployeeRoute = require('./routes/viewAllEmployee');
var updateEmployeeRoute = require('./routes/updateEmployee');
var enterAttaindanceRouter = require('./routes/enterAttaindance');


//employeeside
var employeeLoginRoute = require('./routes/employeeLogin');
var attaindanceRouter = require('./routes/attaindance');
const { ppid } = require('process');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/adminLogin', adminLoginRouter);
app.use('/adminDashboard', adminDashboardRoute); 
app.use('/addEmployee', addEmployeeRoute );
app.use('/viewAllEmployee', viewAllEmployeeRoute)
app.use('/updateEmployee', updateEmployeeRoute);
app.use('/enterAttaindance', enterAttaindanceRouter);

//empside
app.use('/employeeLogin', employeeLoginRoute); 
app.use('/attaindance', attaindanceRouter);

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  next(createError(404));
});

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
