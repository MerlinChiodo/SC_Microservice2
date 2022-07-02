import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useContext, useEffect, useState} from "react";
import RouteContext from "../context/route/RouteContext";
import { Ticket } from 'tabler-icons-react';
import UserContext from "../context/user/UserContext";
import * as htmlToImage from 'html-to-image';
import {create_qrcode, sendEmail} from "../controllers/emailController";

//TODO: remove this
const currency = "EUR";
const style = {"layout":"vertical"};

function Checkout({ currency, showSpinner }) {

    const {user} = useContext(UserContext)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [validCheckout, setValidCheckout] = useState(false)
    const {ticket} = useContext(RouteContext)
    //TODO: replace this
    const amount = "5";

    //TODO: remove debug logs
    useEffect(()=>{
        console.log(ticket)
        console.log(user)
    }, [])


    const createTicket = async () => {
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
            <div className="card rounded-md min-w-fit w-1/2 shrink-0 m-6 bg-base-200 shadow-xl collapse mx-auto" tabIndex="0">
                <div className="card-body p-4">
                    <div className="flex justify-between divide-x-4 divide-dashed divide-base-100">
                        <div  className="flex flex-row justify-between basis-11/12 ">
                            <div id="ticket" className="flex flex-col place-content-around gap-2 collapse-title">
                                <div className="flex flex-row">
                                    <p  className="text-xl font-medium mr-2">
                                        {ticket.tripInfo.departureTime} - {ticket.tripInfo.arrivalTime}
                                    </p>
                                    <p className="text-lg font-medium mx-2">
                                        Umstiege: {ticket.tripInfo.changes -1}
                                    </p>
                                    <p className="text-lg font-medium mx-2">
                                        Dauer: {ticket.tripInfo.duration}
                                    </p>
                                    <p className="text-lg font-medium mx-2">
                                        {ticket.tarif}
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    <p  className="text-sm font-medium">
                                        Abfahrt: <br/>{ticket.tripInfo.departure_station}
                                    </p>
                                    <p  className="text-sm font-medium">
                                        Ankunft: <br/> {ticket.tripInfo.arrival_station}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="basis-1/12 p-6 place-self-center rounded-lg" >
                            <Ticket     size={30}
                                           style={{margin: 0, placeSelf: "center"}}
                                           strokeWidth={2}
                            />
                            <p  className="text-xs font-medium mt-2 text-center">
                                {amount} €
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            { (showSpinner && isPending) && <h2> Loading... </h2> }
            <div className="container w-fit m-6 mx-auto">
            <div>
                <p className="p-6">Mit externem Zahlungsdienst bezahlen:</p>
            </div>
                <PayPalButtons
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
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

                        }).catch(err =>{
                            console.log(err)
                        })
                    });
                }}

                onCancel={function (data, actions) {
                    setValidCheckout(false)
                    console.log("invalid checkout")
                }}
            />
            </div>
        </div>
    );

}
export default Checkout