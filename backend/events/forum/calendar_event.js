#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

exports.sendCalendarEntry = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            //TODO: date validieren
            const validate = ajv.getSchema("calendarEntry")
            try {
            if (validate(req.body)) {
                    channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))
                    res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                return res.status(400).end("Invalid Calendar Entry Data")
            }
            } catch (e) {
                console.log(e)
            }

        })

    })
}

