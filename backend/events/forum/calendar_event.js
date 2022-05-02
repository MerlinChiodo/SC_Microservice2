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

            const validate = ajv.getSchema("calendarEntry")

            if (validate(req.body)) {
                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))
                console.log(`RabbitMQ: sent event: ${req.body}`)
            } else {
                // report error
                return res.status(400).end("Invalid Calendar Entry Data")
            }
        })
    })
}

export {sendCalendarEntry}
