const prisma = require('../lib/prisma');

exports.getFeedbackPerRoute = async(req, res, next) => {
    res.send("getFeedbackPerRoute " + req.params.route_id);
};

exports.getAllFeedback = async(req, res, next) => {
    res.send("getAllFeedback");
};

exports.submitFeedback = async (req, res, next) =>{
    res.send("submitFeedback");
};