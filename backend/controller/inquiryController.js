const prisma = require('../lib/prisma');

exports.getAllInquiries = async(req, res, next) => {
    res.send("getAllInquiries")
}

exports.getInquiry = async(req, res, next) => {
    res.send("getInquiry ")
}

exports.createInquiry = async(req, res, next) => {
    res.send("createInquiry")


}