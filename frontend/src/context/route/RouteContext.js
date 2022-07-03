import React, {createContext, useState} from 'react';



const RouteContext = createContext()

export const RouteProvider = ({children}) => {


    const [route, setRoute] = useState(JSON.parse(localStorage.getItem('routes')) || [{}])
    const [tickets, setTickets] = useState(JSON.parse(localStorage.getItem('tickets')) || [{}])
    const [cart, setCart] = useState([{}])
    const [cart_opened, setCart_opened] = useState(false)

    function clearRoute() {
        localStorage.removeItem('routes')
        setRoute([{}])
    }

    function clearTickets(){
        localStorage.removeItem('tickets')
        setTickets([{}])
    }



    return (
                <RouteContext.Provider
                    value={{
                        route,
                        setRoute,
                        tickets,
                        setTickets,
                        clearRoute,
                        clearTickets,
                        cart,
                        setCart,
                        cart_opened,
                        setCart_opened
                    }}>
                    {children}
                </RouteContext.Provider>

    )}

export default RouteContext