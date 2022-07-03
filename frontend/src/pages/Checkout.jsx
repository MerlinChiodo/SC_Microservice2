import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useContext, useEffect, useState} from "react";
import RouteContext from "../context/route/RouteContext";
import UserContext from "../context/user/UserContext";
import * as htmlToImage from 'html-to-image';
import {create_qrcode, sendEmail} from "../controllers/emailController";
import {showNotification} from "@mantine/notifications";
import * as paypal from "@paypal/react-paypal-js";
import {Link} from "react-router-dom";


//TODO: remove this
const currency = "EUR";
const style = {"layout":"vertical"};

function Checkout({ currency, showSpinner }) {

    const {user} = useContext(UserContext)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [validCheckout, setValidCheckout] = useState(false)
    const {tickets, clearTickets} = useContext(RouteContext)
    //TODO: replace this
    const amount = "5";

    useEffect(()=>{

    }, [setValidCheckout])

    const createTicket = async (ticket) => {
        const ticket_content = {
            ticket_art: ticket.tarif,
            preis: Number(amount),
            abfahrt_haltestelle: ticket.tripInfo.departure_station,
            abfahrt_zeit: ticket.tripInfo.departureTime,
            ankunft_haltestelle: ticket.tripInfo.arrival_station,
            ankunft_zeit: ticket.tripInfo.arrivalTime,
            busreisende_id: user.id,
            vorname: user.user_data.firstname,
            nachname: user.user_data.lastname,
            email: user.user_data.email
        }

        fetch('/ticket/addTicket', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticket_content)
        }).then(async (response) => {
            if (response.ok) {
                let result = await response.json();
                console.log(result)
            }
        }).catch(error => {
            console.error(error);
        })
    }

    function sendMail() {
        create_qrcode(window.location.origin)
            .then((qrCode) => {
                const ticket = document.getElementById("ticket")
                htmlToImage.toPng(ticket, {width: 100, height:100})
                    .then((ticket_image) => {
                    sendEmail('default', {
                        name: `${user.user_data.firstname} ${user.user_data.lastname}` ,
                        qr_code: qrCode.toString(),
                        ticket: ticket_image,
                        to_email: user.user_data.email
                    })
                    })
                    .catch(err => {
                        console.error(err)
                    })
                }).catch((err) => {
                    console.log(err)
        })
    }


    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (
        <div className="container mx-auto m-6">
            <div className="flex text-lg breadcrumbs place-content-center">
                <ul>
                    <li >Ticket auswählen</li>
                    <li>Login</li>
                    <li className="font-semibold">Bezahlen</li>
                </ul>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table w-fit mx-auto" id="ticket">
                    <thead>
                    <tr className="hover">
                        <th>Abfahrt</th>
                        <th>Ankunft</th>
                        <th>Dauer</th>
                        <th>Umstieg</th>
                        <th>Tarif</th>
                        <th>Menge</th>
                        <th>Preis</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets &&
                        tickets.map((ticket, index) =>(<tr className="hover" key={index}>
                        <td>{ticket.tripInfo.departureTime} <br/> {ticket.tripInfo.departure_station}</td>
                        <td>{ticket.tripInfo.arrivalTime} <br/> {ticket.tripInfo.arrival_station}</td>
                        <td>{ticket.tripInfo.duration}</td>
                        <td>{ticket.tripInfo.changes -1}</td>
                        <td>{ticket.tarif.name}</td>
                        <td>{ticket.anzahl}</td>
                        <td>{ticket.tarif.preis}€</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
            { (showSpinner && isPending) && <h2> Loading... </h2> }
            <div className="container w-fit m-6 mx-auto">
            <div>
                <p className="p-6">Mit externem Zahlungsdienst bezahlen:</p>
            </div>
                <PayPalButtons
                disabled={validCheckout || tickets.length === 0}
                forceReRender={[amount, currency, style]}
                fundingSource={paypal.FUNDING.PAYPAL}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                            payer : {
                                email_address: "sb-l5p8t17644643@business.example.com"
                            }
                        })
                        .then((orderId) => {
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        setValidCheckout(true)
                       /* createTicket().then((response)=>{*/
                            sendMail()
                            showNotification({
                                title: 'Email versendet',
                                message: 'Eine Email mit deinem Ticket wurde versendet',
                                color: 'beige'
                            })
                            clearTickets()
                      /*  }).catch(err =>{
                            console.log(err)
                        })*/
                    });
                }}

                onCancel={function (data, actions) {
                    setValidCheckout(false)
                    console.log("invalid checkout")
                    showNotification({
                        title: 'Zahlungsvorgang abgebrochen',
                        message: '',
                        color: 'beige'
                    })
                }}
            />
                {validCheckout && (<div className="mx-auto">
                    <Link className="link link-hover" to="/">Zurück zur Startseite</Link>
                </div>)}
            </div>
        </div>
    );

}
export default Checkout