const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

const {ajv} = require("../validation")
const prisma = require('../../lib/prisma')

exports.receiveKitaInquiry = async (req, res) => {
    amqp.connect(`amqp://${rabbitMQUsername}:${rabbitMQPassword}@${serverURL}`, function (error0, connection) {
        if (error0) {
            throw error0
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1
            }

            channel.consume('stadtbus', async function (msg) {

                console.log(msg.content.toString())
                let kitaInquiry = JSON.parse(msg.content.toString())
                const validate = ajv.getSchema("kitaInquiry")

                if (kitaInquiry.event_name === "New Kita Inquiry") {
                    if (validate(kitaInquiry)) {
                        try {
                            let createKitaInquiry = await prisma.anfrage.create({
                                data: {
                                    event_id: kitaInquiry.event_id,
                                    event_name: kitaInquiry.event_name,
                                    service_name: kitaInquiry.service_name,
                                    number_of_passengers: kitaInquiry.number_of_passengers,
                                    person_responsible: kitaInquiry.person_responsible,
                                    kita_responsible: kitaInquiry.kita_responsible,
                                    date: kitaInquiry.date
                                }
                            })
                        } catch (e) {
                            return console.log(e)
                        }
                    } else {
                        console.log(validate.errors)
                        res.status(400).end("Invalid Inquiry Data")
                    }
                } else {
                    return res.status(400).end("Invalid Event")
                }
            }, {
                noAck: true,
            })
        })
        connection.close()
    })
}

