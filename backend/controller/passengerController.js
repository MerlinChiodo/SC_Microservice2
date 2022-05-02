const prisma = require('../lib/prisma.js');

exports.addPassenger = async (req, res, next) =>{
    res.send('added a Passenger');
};