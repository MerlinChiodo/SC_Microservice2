import React, {createContext, useState} from 'react';


const RouteContext = createContext()

export const RouteProvider = ({children}) => {

    const directionsService = new window.google.maps.DirectionsService();

    const [departure_station, setDeparture_station] = useState({})
    const [arrival_station, setArrival_station] = useState({})
    const [departure_date, setDeparture_date] = useState(new Date())
    const [departure_time, setDeparture_time] = useState((new Date().getTime))
    const [route, setRoute] = useState({})

    function calculateRoute(){

        var departure = new window.google.maps.LatLng(departure_station);
        var arrival = new window.google.maps.LatLng(arrival_station);

        var request = {
            origin: departure,
            destination: arrival,
            travelMode: 'TRANSIT'
        };
        directionsService.route(request, function(result, status) {
            if (status === 'OK') {
                setRoute(result)
            }
        });
    }

    return (
        <RouteContext.Provider
            value={{
                departure_station,
                arrival_station,
                departure_date,
                departure_time,
                route
            }}>
            {children}
        </RouteContext.Provider>)
}

export default RouteContext