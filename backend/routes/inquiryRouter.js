var express = require('express');
var inquiryRouter = express.Router();
var inquiryController = require("../controller/inquiryController")


inquiryRouter.get("/getAllInquiries", inquiryController.getAllInquiries)
inquiryRouter.get("/getInquiry/:inquiry_id",  inquiryController.getInquiry)
inquiryRouter.post("/createInquiry", inquiryController.createInquiry)

module.exports = inquiryRouter