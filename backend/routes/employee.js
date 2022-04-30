var express = require('express');
var employeeRouter = express.Router();


exports.getSoldTicketsPerRoute = async(req, res, next) => {
    res.send("getSoldTicketsPerRoute");
};
exports.getFeedbackPerRoute = async(req, res, next) => {
    res.send("getFeedbackPerRoute ", req.params.route_id);
};
exports.getAllInquiries = async(req, res, next) => {
    res.send("getAllInquiries");
};
exports.getInquiry = async(req, res, next) => {
    res.send("getInquiry ", req.params.inquiry_id);
};
exports.getAllFeedback = async(req, res, next) => {
    res.send("getAllFeedback");
};
module.exports = employeeRouter;