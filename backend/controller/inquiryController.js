const prisma = require('../lib/prisma.js');

exports.getAllInquiries = async(req, res, next) => {
    res.send("getAllInquiries");
};

exports.getInquiry = async(req, res, next) => {
    res.send("getInquiry " + req.params.inquiry_id);
};

exports.createInquiry = async(req, res, next) => {
    res.send("createInquiry");
};