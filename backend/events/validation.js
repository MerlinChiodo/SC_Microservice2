var amqp = require('amqplib/callback_api');

const Ajv = require("ajv")

const schema_newsletterPost = require("./forum/newNewsletterPostSchema.json")
const schema_calendarEntry = require("./forum/newCalendarEntrySchema.json")
const schema_updateAboutUs = require("./landingpage/AboutUsSchema")

const ajv = exports.ajv = new Ajv()

ajv.addSchema(schema_newsletterPost, "newsletterPost")
ajv.addSchema(schema_calendarEntry, "calendarEntry")
ajv.addSchema(schema_updateAboutUs, "updateAboutUs")
