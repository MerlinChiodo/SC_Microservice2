import { ShoppingCart } from 'tabler-icons-react';
import { ChevronRight } from 'tabler-icons-react';
import {Select} from "@mantine/core";



function Ticket({children, route}){

    return(

        <div className="card rounded-md min-w-fit shrink-0 m-6 bg-base-200 shadow-xl collapse" tabIndex="0">
                <div className="card-body p-0 collapse-title">
                    <div className="flex justify-between divide-x-4 divide-dashed divide-base-100 ">
                        <div className="flex flex-row justify-between basis-11/12">
                            <div className="flex flex-col p-4 place-content-around gap-2">
                                    <div className="flex flex-row">
                                        <p  className="text-xl font-medium mr-2">
                                            {route.departureTime} - {route.arrivalTime}
                                        </p>
                                        <p className="text-lg font-medium mx-2">
                                            Umstiege {route.changes}
                                        </p>
                                        <p className="text-lg font-medium mx-2">
                                            Dauer {route.duration}
                                        </p>
                                    </div>
                                        <p  className="text-sm font-medium ">
                                            <b>Linie: {route.line}</b>  {route.headsign}
                                        </p>
                                    <div className="flex flex-row">
                                        <p  className="text-xs font-medium">
                                            Abfahrt: <br/>{route.departure_station}
                                        </p>
                                        <p  className="text-xs font-medium">
                                            Ankunft: <br/> {route.arrival_station}
                                        </p>
                                    </div>
                            </div>
                                <div className="p-4">
                                    <Select
                                        data={['Einzelfahrt', 'Familientarif']}
                                        placeholder="Einzelfahrt"
                                        label="Tarife"
                                        styles={{
                                            input: {borderRadius: 10}
                                        }}
                                    />
                                </div>
                        </div>
                        <div className="basis-1/12 p-6 hover:bg-base-300 place-self-center">
                            <ShoppingCart  size={30}
                                           style={{margin: 0,placeSelf: "center"}}
                                           strokeWidth={2}
/*
                                           onClick={}
*/
                            />
                            <p  className="text-xs font-medium mt-2">
                                Preis
                            </p>
                        </div>
                    </div>
                </div>
                <div className="collapse-content">
                    <p  className="text-xs font-medium ">
                        Anzahl Stationen:  {route.num_stops}
                    </p>
                </div>
            </div>
        )
}

export default Ticket