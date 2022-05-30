#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL


exports.sendNewsletter = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            //TODO: date validieren
            const validate = ajv.getSchema("newsletterPost")
            if (validate(req.body)) {

                const newsletter_event = {
                    event_id: 2001,
                    event_name: 'New Newsletter',
                    service_name: 'stadtbus',
                    title: req.body.title,
                    short_description: req.body.short_description,
                    long_description: req.body.long_description,
                    event_on: req.body.event_on,
                    picture_url: req.body.picture_url
                }


                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(newsletter_event)))
                console.log(`RabbitMQ: sent event ${newsletter_event}`)
                return res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                res.status(400).end("Invalid Newsletter Post Data")
            }
        })
    })
}


