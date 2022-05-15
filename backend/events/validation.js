var amqp = require('amqplib/callback_api');

const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const schema_newsletterPost = require("./forum/newNewsletterPostSchema.json")
const schema_calendarEntry = require("./forum/newCalendarEntrySchema.json")
const schema_updateAboutUs = require("./landingpage/AboutUsSchema.json")
const schema_kitainquiry = require("./kita/newKitaInquirySchema.json")

const ajv = exports.ajv = new Ajv()
addFormats(ajv)

ajv.addSchema(schema_newsletterPost, "newsletterPost")
ajv.addSchema(schema_calendarEntry, "calendarEntry")
ajv.addSchema(schema_updateAboutUs, "updateAboutUs")
ajv.addSchema(schema_kitainquiry, "kitaInquiry")