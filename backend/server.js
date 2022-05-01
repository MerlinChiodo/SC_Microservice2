var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require("./routes/index")
var passengerRouter = require('./routes/passenger');
var infoRouter = require("./routes/info");
var ticketRouter = require("./routes/ticket")
var employeeRouter = require("./routes/employee");

const app = express();

// // view engine setup
app.set('views', './views')
app.set('view engine', 'pug');

// app.use(logger('dev'));

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);

app.use('/passenger', passengerRouter);
app.use("/info", infoRouter);
app.use("/ticket", ticketRouter);
app.use("/employee", employeeRouter);

module.exports = app;
