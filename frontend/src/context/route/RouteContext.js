import React, {createContext, useState} from 'react';



const RouteContext = createContext()

export const RouteProvider = ({children}) => {


    const [route, setRoute] = useState(JSON.parse(localStorage.getItem('routes')) || [{}])
    const [ticket, setTicket] = useState(JSON.parse(localStorage.getItem('ticket')) || {})


    function clearRoute() {
        localStorage.removeItem('routes')
        setRoute([{}])
    }

    function clearTicket(){
        localStorage.removeItem('ticket')
        setTicket({})
    }


    return (
                <RouteContext.Provider
                    value={{
                        route,
                        setRoute,
                        ticket,
                        setTicket,
                        clearRoute,
                        clearTicket
                    }}>
                    {children}
                </RouteContext.Provider>

    )}

export default RouteContext