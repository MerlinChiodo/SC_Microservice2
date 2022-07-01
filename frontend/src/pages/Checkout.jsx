import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useContext, useEffect, useState} from "react";
import RouteContext from "../context/route/RouteContext";
import { Ticket } from 'tabler-icons-react';
import emailjs from 'emailjs-com';
import QRCode from 'qrcode'
import UserContext from "../context/user/UserContext";
import * as htmlToImage from 'html-to-image';

const currency = "EUR";
const style = {"layout":"vertical"};

function Checkout({ currency, showSpinner }) {

    const {user} = useContext(UserContext)
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [validCheckout, setValidCheckout] = useState(false)
    const {ticket} = useContext(RouteContext)
    const amount = "5";

    const create_qrcode = async () =>{
        const qrcode_url = window.location.origin
        try {
            return (await QRCode.toDataURL(qrcode_url))
        } catch (err) {
            console.error(err)
        }
    }

    function sendEmail() {

        create_qrcode()
            .then((result) => {
                const ticket = document.getElementById("ticket")
                htmlToImage.toPng(ticket)
                    .then((url) => {
                        emailjs.init('LCKjwdRD3AvI_w5KO')
                        emailjs.send('gmail', 'default', {
                            name: `${user.user_data.firstname} ${user.user_data.lastname}` ,
                            qr_code: result.toString(),
                            ticket: url,
                            to_email: user.user_data.email
                        })
                            .then((result) => {
                                console.log(result.text);
                            }, (error) => {
                                console.log(error.text);
                            });
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
            <button className="btn btn-primary" onClick={sendEmail}>Send Email</button>
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
                    });
                }}
                onCancel={function (data, actions) {
                    return setValidCheckout(false)
                }}
            />
            </div>
        </div>
    );

}
export default Checkout