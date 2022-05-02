const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

const {ajv} = require("../validation")
//const prisma = require('../lib/prisma.js')
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient({
    log: ['query','info','warn','error'],
})


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

                let kitaInquiry = JSON.parse(msg.content.toString())
                const validate = ajv.getSchema("calendarEntry")

                if (validate(kitaInquiry)) {
                    try{
                        console.log(kitaInquiry)
                        //validate date
                        //add inquiry to db
                    } catch (e) {
                        return console.log(e)
                    }
                }

            }, {
                noAck: true,
            })
        })
    })
