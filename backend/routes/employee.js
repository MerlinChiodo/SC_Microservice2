var express = require('express');
var employeeRouter = express.Router();


employeeRouter.get("/getSoldTicketsPerRoute/:route_id", async(req, res, next) => {
    res.send("getSoldTicketsPerRoute " + req.params.route_id);
});
employeeRouter.get("/getFeedbackPerRoute/:route_id", async(req, res, next) => {
    res.send("getFeedbackPerRoute " + req.params.route_id);
});
employeeRouter.get("/getAllFeedback", async(req, res, next) => {
    res.send("getAllFeedback");
});
employeeRouter.get("/getAllInquiries", async(req, res, next) => {
    res.send("getAllInquiries");
});
employeeRouter.get("/getInquiry/:inquiry_id",  async(req, res, next) => {
    res.send("getInquiry " + req.params.inquiry_id);
});

module.exports = employeeRouter;