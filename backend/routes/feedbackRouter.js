var express = require('express');
var feedbackRouter = express.Router();
var feedbackController = require("../controller/feedbackController")


feedbackRouter.get("/getFeedbackPerRoute/:route_id", feedbackController.getFeedbackPerRoute)
feedbackRouter.get("/getAllFeedback", feedbackController.getAllFeedback)
feedbackRouter.post("/submitFeedback",  feedbackController.submitFeedback)

module.exports = feedbackRouter;