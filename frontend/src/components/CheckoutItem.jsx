import {Ticket} from "tabler-icons-react";

function CheckoutItem({ticket, amount}) {
    return (
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
    )
}

export default CheckoutItem