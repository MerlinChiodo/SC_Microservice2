var express = require('express');
var inquiryRouter = express.Router();
var inquiryController = require("../controller/inquiryController")


inquiryRouter.get("/getAllInquiries", inquiryController.getAllInquiries)
inquiryRouter.get("/getInquiry/:inquiry_id",  inquiryController.getInquiry)
inquiryRouter.post("/createInquiry", inquiryController.createInquiry)
inquiryRouter.put("/acceptInquiry:inquiry_id", inquiryController.acceptInquiry)
inquiryRouter.delete("/denyInquiry:inquiry_id", inquiryController.denyInquiry)

module.exports = inquiryRouter