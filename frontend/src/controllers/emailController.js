import emailjs from "emailjs-com";

const QRCode = require("qrcode");

const email_key = process.env.REACT_APP_email_key
emailjs.init(email_key)

export async function create_qrcode(url){
    const qrcode_url = url
    try {
        return (await QRCode.toDataURL(qrcode_url))
    } catch (err) {
        console.error(err)
    }
}

export function sendEmail(templateID, params){
    emailjs.send('email_service', templateID, params)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}