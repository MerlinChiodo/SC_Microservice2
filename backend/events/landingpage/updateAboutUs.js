#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

exports.updateAboutUs = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            const validate = ajv.getSchema("updateAboutUs")
            if (validate(req.body)) {

                const aboutUs = {
                    event_id: 2001,
                    event_name: 'Update About Us',
                    service_name: 'stadtbus',
                    date: req.body.date,
                    about_us: req.body.about_us,
                    picture: req.body.picture
                }

                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(aboutUs)))
                return res.status(200).end('ok')
            } else {
                res.status(400).end("Invalid About Us Data")
            }
        })
    })
}

