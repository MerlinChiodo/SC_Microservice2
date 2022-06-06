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
            try {
            if (validate(req.body)) {
                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))
                return res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                res.status(400).end("Invalid Newsletter Post Data")
            }
        } catch (e) {
                console.log(e)
            }
    })
})
}


