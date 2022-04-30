var express = require('express');
var ticketRouter = express.Router();

exports.addTicket = function(req, res, next){
    res.send("Ticket added")
};

module.exports = ticketRouter;