import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useContext, useEffect, useState} from "react";
import RouteContext from "../context/route/RouteContext";
import { Ticket } from 'tabler-icons-react';
import UserContext from "../context/user/UserContext";
import * as htmlToImage from 'html-to-image';
import {create_qrcode, sendEmail} from "../controllers/emailController";
import {showNotification} from "@mantine/notifications";
import CheckoutItem from "../components/CheckoutItem";
import * as paypal from "@paypal/react-paypal-js";

//TODO: remove this
const currency = "EUR";
const style = {"layout":"vertical"};

function Checkout({ currency, showSpinner }) {

    const {user} = useContext(UserContext)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [validCheckout, setValidCheckout] = useState(false)
    const {tickets} = useContext(RouteContext)
    //TODO: replace this
    const amount = "5";

    //TODO: remove debug logs
    useEffect(()=>{
        console.log(tickets)
        console.log(user)
    }, [])


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
                htmlToImage.toPng(ticket)
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
   {/*         {<CheckoutItem>

            </CheckoutItem>}*/}
            { (showSpinner && isPending) && <h2> Loading... </h2> }
            <div className="container w-fit m-6 mx-auto">
            <div>
                <p className="p-6">Mit externem Zahlungsdienst bezahlen:</p>
            </div>
                <PayPalButtons
                disabled={false}
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
                        createTicket().then((response)=>{
                            sendMail()

                            showNotification({
                                title: 'Email versendet',
                                message: 'Eine Email mit deinem Ticket wurde versendet',
                            })

                        }).catch(err =>{
                            console.log(err)
                        })
                    });
                }}

                onCancel={function (data, actions) {
                    setValidCheckout(false)
                    console.log("invalid checkout")
                    showNotification({
                        title: 'Zahlungsvorgang abgebrochen',
                        message: '',
                    })
                }}
            />
            </div>
        </div>
    );

}
export default Checkout