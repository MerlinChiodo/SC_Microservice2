const rabbitmq = require("../events/forum/calendar_event");

exports.sendCalendarEvent = async (req, res) => {
    await rabbitmq.sendCalendarEntry(req, res)
    return res.status(200).send({error: false, msg: 'event successfully sent'})
}
