#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

exports.sendCalendarEntry = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            //TODO: date validieren
            const validate = ajv.getSchema("calendarEntry")

            if (validate(req.body)) {

               /* const calender_event = {
                    event_id: 2002,
                    event_name: 'New Calendar Entry',
                    service_name: 'stadtbus',
                    title: req.body.title,
                    short_description: req.body.short_description,
                    long_description: req.body.long_description,
                    event_on: req.body.event_on,
                    picture_url: req.body.picture_url
                }*/

                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))
                console.log(`RabbitMQ: sent event: ${req.body}`)
            } else {
                return res.status(400).end("Invalid Calendar Entry Data")
            }
        })
    })
}

