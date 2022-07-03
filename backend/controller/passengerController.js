const prisma = require('../lib/prisma');

exports.createPassenger = async (req, res, next) =>{
    res.send('added a Passenger');
};