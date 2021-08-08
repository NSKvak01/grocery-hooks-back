var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require("mongoose")
let cors = require("cors")

mongoose  
  .connect("mongodb://localhost:27017/grocery-back", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("MongoDB connected")
  })
  .catch(function(e){
    console.log(e)
  })

var groceryRouter = require('./routes/groceryRouter');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/grocery', groceryRouter);

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
  res.json('error');
});

module.exports = app;
