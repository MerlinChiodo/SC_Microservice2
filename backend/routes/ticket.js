var express = require('express');
var ticketRouter = express.Router();

ticketRouter.post("/addTicket",async (req, res, next) =>{
    res.send("Ticket added")
});


module.exports = ticketRouter;