import React, {createContext, useState} from 'react';



const RouteContext = createContext()

export const RouteProvider = ({children}) => {


    const [departure_date, setDeparture_date] = useState(new Date())
    const [departure_time, setDeparture_time] = useState("")
    const [route, setRoute] = useState([{}])
    const [ticket, setTicket] = useState({})

    function clearRoute() {
        setRoute([{}])
    }

    return (
                <RouteContext.Provider
                    value={{
                        departure_date,
                        departure_time,
                        route,
                        setRoute,
                        ticket,
                        setTicket,
                        clearRoute
                    }}>
                    {children}
                </RouteContext.Provider>

    )}

export default RouteContext