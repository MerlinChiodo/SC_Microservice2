const prisma = require('../lib/prisma');

exports.getSoldTicketsPerRoute = async(req, res, next) => {
    res.send("getSoldTicketsPerRoute ");
};

exports.addTicket = async (req, res, next) =>{
    res.send("Ticket added")
};
