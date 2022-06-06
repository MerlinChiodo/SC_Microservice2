var amqp = require('amqplib/callback_api');

const {ajv} = require("../validation")
const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

exports.deleteService = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}`, (connectError, connection) => {
        if (connectError) {
            throw connectError
        }
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            const validate = ajv.getSchema("deleteService")
            if (validate(req.body)) {

                const data = {
                    event_id: 2004,
                    event_name: 'Delete My Service',
                    service_name: 'stadtbus',
                    date: req.body.date
                }

                channel.publish('events', "public.stadtbus", Buffer.from(JSON.stringify(data)))
                return res.status(200).send({error: false, msg: 'event successfully sent'})
            } else {
                res.status(400).end("Invalid Data - unable to delete service ")
            }
        })
    })
}