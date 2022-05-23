const prisma = require('../lib/prisma');

exports.getAllEmployees = async (req, res, next) =>{
    res.send("getAllEmployees");
};

exports.getEmployee = async (req, res) => {
    res.send("getEmployee", req.params.employee_id)
}