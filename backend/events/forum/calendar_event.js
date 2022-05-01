#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitUser
const rabbitMQPassword = process.env.rabbitPass
const serverURL = process.env.server


//`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`
//function sendCalendarEntry(req, res) {
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
            var req = {
                event_id: 2001,

            }

            const validate = ajv.getSchema("calendarEntry")

            //console.log(validate)
            if (validate(req)) {
/*                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(req.body)))*/
                console.log(`RabbitMQ: sent event: ${req}`)
                var queue = 'task_queue';


                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(req)), {
                    persistent: true
                });
            } else {
                // report error
                //res.status(400).end("Invalid Calendar Entry Data")
                console.log("Invalid Calendar Entry Data")
                console.log(req)
            }
        })
    })
//}

//export {sendCalendarEntry}
