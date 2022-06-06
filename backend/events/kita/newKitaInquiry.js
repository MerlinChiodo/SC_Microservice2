const amqp = require('amqplib/callback_api')

const rabbitMQUsername = process.env.rabbitMQUsername
const rabbitMQPassword = process.env.rabbitMQPassword
const serverURL = process.env.serverURL

const {ajv} = require("../validation")
const prisma = require('../../lib/prisma')


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
                            let createKitaInquiry = await prisma.Anfrage.create({
                                data: {
                                    verantwortlicher: kitaInquiry.person_responsible,
                                    institution: kitaInquiry.kita_responsible,
                                    anzahlPassagiere: kitaInquiry.number_of_passengers,
                                    ticket : {
                                        create : {
                                            ticket_art: "GRUPPENTICKET",
                                            geltungstag: kitaInquiry.date,
                                        },
                                    },
                                },
                            })
                            console.log("prisma create success")
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        console.log(validate.errors)
                        console.log("Invalid Inquiry Data")
                    }
                } else {
                    console.log("Invalid Event")
                }
            }, {
                noAck: true,
            })
        })
    })


