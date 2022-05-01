var express = require('express');
var passengerRouter = express.Router();


passengerRouter.post("/addPassenger",  async (req, res, next) =>{
  res.send('added a Passenger');
});
passengerRouter.post("/submitFeedback",  async (req, res, next) =>{
  res.send("submitFeedback");
});

module.exports = passengerRouter;
