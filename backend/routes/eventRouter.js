var express = require('express');
var eventRouter = express.Router();
const calendar_event = require("../events/forum/calendar_event")
const newsletter_event = require("../events/forum/newsletter_event")
const aboutUs_event = require("../events/landingpage/updateAboutUs")
const deleteService_event = require("../events/landingpage/deleteService")

eventRouter.post("/sendCalendarEntry", calendar_event.sendCalendarEntry)
eventRouter.post("/sendNewsletter", newsletter_event.sendNewsletter)
eventRouter.post("/updateAboutUs", aboutUs_event.updateAboutUs)
eventRouter.delete("/deleteService", deleteService_event.deleteService)

module.exports = eventRouter