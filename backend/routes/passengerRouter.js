var express = require('express');
var passengerRouter = express.Router();
var passengerController = require("../controller/passengerController")


passengerRouter.post("/addPassenger", passengerController.addPassenger)


module.exports = passengerRouter;
