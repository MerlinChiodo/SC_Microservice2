import { ShoppingCart } from 'tabler-icons-react';

import {NumberInput, Select} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import RouteContext from "../context/route/RouteContext";

function Ticket({children, routeItem, index}){

    const navigate = useNavigate()
    const {setTickets, route, tickets, setCart_opened} = useContext(RouteContext)
    const [tarif, setTarif] = useState('Einzelfahrt')
    const [anzahl, setAnzahl] = useState(1)

// TODO:fix tickets
    const handleClick = () => {
        const ticket = {
            tripInfo: route[index],
            tarif: tarif,
            anzahl: anzahl
        }

        let existingEntries = JSON.parse(localStorage.getItem("tickets"));
        if(existingEntries == null) {
            existingEntries = [];
        }
        existingEntries.push(ticket)
        localStorage.setItem('tickets', JSON.stringify(existingEntries))
        setTickets(JSON.parse(localStorage.getItem('tickets')))
        setCart_opened(true)
        /*navigate('/login')*/
    }



    return(
        <div className="card rounded-md min-w-fit shrink-0 m-6 bg-base-200 shadow-xl collapse" tabIndex="0">
                <div className="card-body p-4 collapse-title">
                    <div className="flex justify-between divide-x-4 divide-dashed divide-base-100 ">
                        <div className="flex flex-row justify-between basis-11/12">
                            <div className="flex flex-col place-content-around gap-2">
                                    <div className="flex flex-row">
                                        <p  className="text-xl font-medium mr-2">
                                            {routeItem.departureTime} - {routeItem.arrivalTime}
                                        </p>
                                        <p className="text-lg font-medium mx-2">
                                            Umstiege: {routeItem.changes -1}
                                        </p>
                                        <p className="text-lg font-medium mx-2">
                                            Dauer: {routeItem.duration}
                                        </p>
                                    </div>
                                    <div className="flex flex-row">
                                        <p  className="text-sm font-medium">
                                            Abfahrt: <br/>{routeItem.departure_station}
                                        </p>
                                        <p  className="text-sm font-medium">
                                            Ankunft: <br/> {routeItem.arrival_station}
                                        </p>
                                    </div>
                            </div>
                                <div className="mr-8 mb-2" >
                                        <Select
                                            id="tarif"
                                            data={['Einzelfahrt', 'Tagesticket', 'StadtTicket']}
                                            label="Tarife"
                                            value={tarif}
                                            onChange={setTarif}
                                            styles={{
                                                input: {borderRadius: 10}
                                            }}
                                        />
                                        <NumberInput
                                            styles={{input: {borderRadius: 10, height: "auto", lineHeight: 2.5}}}
                                            defaultValue={1}
                                            value={anzahl}
                                            onChange={setAnzahl}
                                            label="Personenanzahl"
                                        />
                                    </div>
                                </div>

                                    <div className="basis-1/12 p-6 place-self-center hover:bg-base-300 rounded-lg" >
                                        <ShoppingCart  size={30}
                                                       style={{margin: 0, placeSelf: "center"}}
                                                       strokeWidth={2}
                                                        onClick={handleClick}
                                        />
                                        <p  className="text-xs font-medium mt-2">
                                            Preis
                                        </p>
                                    </div>
                    </div>
                </div>
                <div className="collapse-content h-auto ">
                   {routeItem.steps.map((step) => {
                        if(step.travel_mode ==="WALKING")
                            return (
                                <div className="flex flex-row">
                                    <p  className="text-sm font-medium mr-2">
                                        {step.duration.text} {step.instructions}
                                    </p>
                                </div>
                            )
                        else
                           return(
                           <div className="m-6">
                                   <div className="flex flex-row">
                                       <p  className="text-lg font-semibold font-medium mr-2">
                                           {step.transit.departure_time.text} - {step.transit.arrival_time.text}
                                       </p>
                                       <p  className="text-lg font-medium">
                                           Linie: {step.transit.line.short_name}  {step.transit.headsign}
                                       </p>
                                   </div>
                                   <div className="flex flex-row gap-6">
                                       <p  className="text-xs font-medium">
                                            Abfahrt: <br/>{step.transit.departure_stop.name}
                                        </p>
                                       <p  className="text-xs font-medium">
                                           Ankunft: <br/> {step.transit.arrival_stop.name}
                                       </p>
                                   </div>
                           </div>
                   )})}
                </div>
            </div>
        )
}

export default Ticket