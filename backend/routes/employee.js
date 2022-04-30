var express = require('express');
var employeeRouter = express.Router();


exports.getSoldTicketsPerRoute = async(req, res, next) => {
    res.send("getSoldTickets");
};
exports.getFeedbackPerRoute = async(req, res, next) => {
    res.send("getFeedbackPerRoute");
};
exports.getAllInquiries = async(req, res, next) => {
    res.send("getAllInquiries");
};
exports.getInquiry = async(req, res, next) => {
    res.send("getInquiry");
};
exports.getAllFeedback = async(req, res, next) => {
    res.send("getAllFeedback");
};
module.exports = employeeRouter;