import { ShoppingCart } from 'tabler-icons-react';
import { ChevronRight } from 'tabler-icons-react';
import {Select} from "@mantine/core";



function Ticket({children, route}){

    return(
            <div className="card min-w-fit shrink-0 m-6 bg-base-200 shadow-xl">
                <div className="card-body p-0">
                    <div className="grid grid-cols-2 divide-x-4 divide-dashed divide-base-100 ">
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col p-4 gap-6 place-content-stretch">
                                <div className="flex flex-row">
                                    <p  className="text-xl font-medium ">
                                        Ticketart
                                    </p>
                                    <p  className="text-xl font-medium ">
                                        Linie {route.line} {route.headsign}
                                    </p>
                                </div>
                                <div className="flex flex-row">
                                    <p  className="text-sm font-medium ">
                                        Abfahrt {route.departure_station} {route.departureTime}
                                    </p>
                                    <p  className="text-sm font-medium ">
                                        Ankunft {route.arrival_station} {route.arrivalTime}
                                    </p>
                                </div>
                            </div>
                            <div className="w-fit justify-self-end">
                                <Select
                                    style={{ marginTop: 20, zIndex: 2 }}
                                    data={['Einzelfahrt', 'Familientarif']}
                                    placeholder="Einzelfahrt"
                                    label="Tarife"
                                    styles={{
                                        input: {borderRadius: 10 }
                                    }}
                                />
                            </div>
                        </div>




                        <div className="justify-self-end p-6 hover:bg-base-300 place-self-center">
                            <ShoppingCart  size={30}
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
            </div>
        )
}

export default Ticket