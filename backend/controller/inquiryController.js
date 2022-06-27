const prisma = require('../lib/prisma');

exports.getAllInquiries = async(req, res) => {

    try {
        const inquiries = await prisma.Anfrage.findMany({
            where : {bearbeitet : false},
            include: {
                ticket: true
            },
        })
        if (inquiries) {
            return res.status(200).json({success: true, msg: inquiries})
        } else {
            return res.status(404).json({success: false, err: "No Inquiries found!"})
        }
    } catch (e){
        return res.status(500).json({success: false, err: "Internal Database Error"})
    }
}


exports.getInquiry = async(req, res) => {

    let inquiry_id
    try {
        let parsed_id = parseInt(req.params.inquiry_id)
        inquiry_id = parsed_id
    } catch (error) {
        return res.status(500).send(error.message)
    }
    try {
        const inquiry = await prisma.Anfrage.findUnique({
            where: {
                id: inquiry_id,
            },
        })
    } catch (error){
        return res.status(500).send(error.message)
    }
    return res.status(200).json(inquiry)
}

exports.createInquiry = async(req, res) => {
    res.send("createInquiry")
}

exports.acceptInquiry = async(req, res) => {
    let inquiry_id
    try {
        let parsed_id = parseInt(req.params.inquiry_id)
        inquiry_id = parsed_id
    } catch (error) {
        return res.status(500).send(error.message)
    }
    try {
        const inquiry = await prisma.Anfrage.update({
            where: {
                id: inquiry_id,
            },
            data: {
                bearbeitet:true
            }
        })

        return res.status(200).json(inquiry)

    } catch (error){
        return res.status(500).send(error.message)
    }

}

exports.denyInquiry = async(req, res) => {
    let inquiry_id
    try {
        let parsed_id = parseInt(req.params.inquiry_id)
        inquiry_id = parsed_id
    } catch (error) {
        return res.status(500).send(error.message)
    }
    try {
        const inquiry = await prisma.Anfrage.delete({
            where: {
                id: inquiry_id,
            },
        })
        return res.status(200).json(inquiry)
    } catch (error){
        return res.status(500).send(error.message)
    }
}