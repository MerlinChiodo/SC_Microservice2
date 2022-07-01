const prisma = require('../lib/prisma');

exports.getSoldTicketsPerRoute = async(req, res, next) => {
    res.send("getSoldTicketsPerRoute ");
};

exports.addTicket = async (req, res) =>{
    try {
        let ticket = await prisma.Ticket.create({
            data: {
                ticket_art: req.body.ticket_art,
                geltungstag: req.body.geltungstag,
                preis: req.body.preis,
                fahrt: {
                    create: {
                        abfahrt_haltestelle: req.body.abfahrt_haltestelle,
                        abfahrt_zeit: req.body.abfahrt_zeit,
                        ankunft_haltestelle: req.body.ankunft_haltestelle,
                        ankunft_zeit: req.body.ankunft_zeit
                    }
                },
                busreisende: {
                    connectOrCreate: {
                        where: {smartCity_id: req.body.busreisende_id},
                        create: {
                            smartCity_id: req.body.busreisende_id,
                            vorname: req.body.vorname,
                            nachname: req.body.nachname,
                            email: req.body.email
                        }
                    }
                }
            }
        })
        return res.status(200).json(ticket);
    } catch (e) {
        console.log(e)
        return res.status(400).send({msg: "invalid ticket data"})
    }
};
