const prisma = require('../lib/prisma');

exports.addPassenger = async (req, res, next) =>{
    res.send('added a Passenger');
};