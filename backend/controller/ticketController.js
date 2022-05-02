const prisma = require('../lib/prisma.js');

exports.getSoldTicketsPerRoute = async(req, res, next) => {
    res.send("getSoldTicketsPerRoute " + req.params.route_id);
};

exports.addTicket = async (req, res, next) =>{
    res.send("Ticket added")
};
