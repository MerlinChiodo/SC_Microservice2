import { Prisma, PrismaClient } from '@prisma/client'

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var passengerRouter = require('./routes/passenger');
var infoRouter = require("./routes/info");
var ticketRouter = require("./routes/ticket")
var employeeRouter = require("./routes/employee");

const prisma = new PrismaClient()
const app = express();

// // view engine setup
app.set('views', './views')
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/passenger', passengerRouter);
app.use("/info", infoRouter);
app.use("/ticket", ticketRouter);
app.use("/employee", employeeRouter);



app.get("/getAllInfoPosts", infoRouter.getAllInfoPosts);
app.post("/createInfoPost", infoRouter.createInfoPost);
app.delete("/deleteInfoPost/:post_id", infoRouter.deleteInfoPost);
app.put("/editInfoPost", infoRouter.editInfoPost);

app.post("/addPassenger", passengerRouter.addPassenger);
app.post("/submitFeedback", passengerRouter.submitFeedback);

app.post("/addTicket", ticketRouter.addTicket);

app.get("/getSoldTicketsPerRoute/:route_id", employeeRouter.getSoldTicketsPerRoute);
app.get("/getFeedbackPerRoute/:route_id", employeeRouter.getFeedbackPerRoute);
app.get("/getAllFeedback", employeeRouter.getAllFeedback);
app.get("/getAllInquiries", employeeRouter.getAllInquiries);
app.get("/getInquiry/:inquiry_id", employeeRouter.getInquiry);


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
