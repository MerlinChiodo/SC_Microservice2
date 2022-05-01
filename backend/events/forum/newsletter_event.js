#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitUser
const rabbitMQPassword = process.env.rabbitPass
const serverURL = process.env.server
//`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`

function sendNewsletterPost(req, res) {
    amqp.connect('amqp://localhost', (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
/*            channel.assertQueue(queue, {
                durable: true
            })*/
            const validate = ajv.getSchema("newsletterPost")
            if (validate(req.body)) {
                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))
                console.log(`RabbitMQ: sent event ${req.body}`)
            } else {
                // report error
                res.status(400).end("Invalid Newsletter Post Data")
            }
        })
    })
}

export {sendNewsletterPost}

