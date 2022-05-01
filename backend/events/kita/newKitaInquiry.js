const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitUser
const rabbitMQPassword = process.env.rabbitPass
const serverURL = process.env.server

amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}:5672`, function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        channel.consume('stadtbus', function (msg) {
            console.log(msg.content.toString())
        }, {
            noAck: true,
        })
    })
})