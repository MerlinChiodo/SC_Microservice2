import React, {useState} from 'react'
import {Modal} from "@mantine/core";
import emailjs from "emailjs-com";
import {create_qrcode, sendEmail} from "../controllers/emailController";
import {showNotification} from "@mantine/notifications";

function InquiryItem({item}){

    const [opened, setOpened] = useState(false);


    const handleClick_deny = async () => {
        const response = await fetch(`/inquiry/denyInquiry/${item.anfrage_id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        setOpened(false)
        //email senden
    }

    const handleClick_accept = async () => {

        const response = await fetch(`/inquiry/acceptInquiry/${item.anfrage_id}`, {
            method: 'PUT'
        })
        const data = await response.json()
        console.log(data)
        setOpened(false)
        //email senden
        create_qrcode(`${window.location.origin}/inquiry/getInquiry/${item.anfrage_id}`)
            .then((qrCode) => {
                sendEmail('inquiry', {
                    ticket_art: item.ticket.ticket_art,
                    institution: item.institution,
                    verantwortlicher: item.verantwortlicher,
                    anzahl_passagiere: item.anzahlPassagiere,
                    geltungstag: item.ticket.geltungstag,
                    preis: item.preis,
                    to_email: item.verantwortlicher,
                    qr_code: qrCode.toString()
                })
                showNotification({
                    title: 'Email versendet',
                    message: 'Eine Email mit deinem Ticket wurde versendet',
                })
            })
            .catch(err => {
                console.error(err)
            })
    }


    return(
        <div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Antrag bearbeiten"
                centered

            >
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p  className="text-sm font-medium text-gray-900 truncate ">
                                        Ticketart
                                    </p>
                                    <p  className="text-sm text-gray-500 truncate ">
                                        {item.ticket.ticket_art}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        Institution
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {item.institution}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        Verantwortlicher
                                    </p>
                                    <p  className="text-sm text-gray-500 truncate ">
                                        {item.verantwortlicher}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        Anzahl der Passagiere
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {item.anzahlPassagiere}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="pt-3 sm:pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        Geltungstag
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {item.ticket.geltungstag}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        Preis
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        {item.ticket.preis}€
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex mt-6 place-content-around">
                    <button className="btn btn-sm btn-outline rounded-sm" onClick={handleClick_deny}>Ablehnen </button>
                    <button className="btn btn-sm btn-outline btn-success rounded-sm" onClick={handleClick_accept}>Annehmen</button>
                </div>
            </Modal>

            <div className="p-2 bg-white border shadow-md sm:p-8 m-4" onClick={() => setOpened(true)}>
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 ">Anfrage {item.anfrage_id}</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 ">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p  className="text-sm font-medium text-gray-900 truncate ">
                                    Ticketart
                                </p>
                                <p  className="text-sm text-gray-500 truncate ">
                                    {item.ticket.ticket_art}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate ">
                                    Institution
                                </p>
                                <p className="text-sm text-gray-500 truncate ">
                                    {item.institution}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default InquiryItem