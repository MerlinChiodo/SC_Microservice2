var express = require('express');
var employeeRouter = express.Router();
var employeeController = require("../controller/employeeController")

employeeRouter.get("/getAllEmployees", employeeController.getAllEmployees)
employeeRouter.get("/getEmployee/:employee_id", employeeController.getEmployee)

module.exports = employeeRouter