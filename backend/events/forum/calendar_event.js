#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL


function sendCalendarEntry(req, res) {
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

                const calender_event = {
                    event_id: 2002,
                    event_name: 'New Calendar Entry',
                    service_name: 'stadtbus',
                    title: req.body.title,
                    text_short: req.body.text_short,
                    text_long: req.body.text_long,
                    date: req.body.date,
                    picture_url: req.body.picture_url
                }

                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(calender_event)))
                console.log(`RabbitMQ: sent event: ${calender_event}`)
            } else {
                // report error
                return res.status(400).end("Invalid Calendar Entry Data")
            }
        })
    })
}

export {sendCalendarEntry}
