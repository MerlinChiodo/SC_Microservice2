var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require("./routes/index")
var passengerRouter = require('./routes/passengerRouter');
var infoRouter = require("./routes/infoRouter");
var ticketRouter = require("./routes/ticketRouter")
var employeeRouter = require("./routes/employeeRouter");
var inquiryRouter = require("./routes/inquiryRouter")
var eventRouter = require("./routes/eventRouter")


const app = express();

// // view engine setup
app.set('views', './views')
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "../frontend/build")));

/*app.get("*", async (req, res) =>{
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})*/

app.use('/', indexRouter)

app.use('/passenger', passengerRouter)
app.use("/info", infoRouter)
app.use("/ticket", ticketRouter)
app.use("/employee", employeeRouter)
app.use("/inquiry", inquiryRouter)
app.use("/event", eventRouter)

app.use(function(req, res, next) {
    next(createError(404));
});

// custom middleware (err argument) => must be defined last in order
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
