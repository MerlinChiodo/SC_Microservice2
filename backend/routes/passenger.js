var express = require('express');
var passengerRouter = express.Router();


exports.addPassenger =  function(req, res, next) {
  res.send('added a Passenger');
};
exports.submitFeedback = function(req, res, next){
  res.send("submitFeedback");
};


module.exports = passengerRouter;
