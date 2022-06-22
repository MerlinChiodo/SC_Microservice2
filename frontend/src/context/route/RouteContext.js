import React, {createContext, useState} from 'react';



const RouteContext = createContext()

export const RouteProvider = ({children}) => {


    const [departure_date, setDeparture_date] = useState(new Date())
    const [departure_time, setDeparture_time] = useState("")
    const [route, setRoute] = useState({})
/*
    function calculateRoute(){

        const directionsService = new window.google.maps.DirectionsService();
        const departure = new window.google.maps.LatLng(departure_station.coordinates[0], departure_station.coordinates[1]);
        const arrival = new window.google.maps.LatLng(arrival_station.coordinates[0],arrival_station.coordinates[1] );

        const request = {
            origin: departure,
            destination: arrival,
            travelMode: 'TRANSIT'
        };
        directionsService.route(request, function(result, status) {
            if (status === 'OK') {
                setRoute(result)
            }
        });
    }*/

    return (
                <RouteContext.Provider
                    value={{
                        departure_date,
                        departure_time,
                        route,
                        setRoute
                    }}>
                    {children}
                </RouteContext.Provider>

    )}

export default RouteContext