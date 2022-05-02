var express = require('express');
var ticketRouter = express.Router();
var ticketController = require("../controller/ticketController")

ticketRouter.post("/addTicket",ticketController.addTicket)
ticketRouter.get("/getSoldTicketsPerRoute/:route_id", ticketController.getSoldTicketsPerRoute)

module.exports = ticketRouter;