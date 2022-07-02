import Ticket from "../components/Ticket";
import {useContext, useEffect, useState} from "react";
import RouteContext from "../context/route/RouteContext";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import dayjs from 'dayjs';




function DisplayTickets() {

    const {route, setRoute} = useContext(RouteContext)
    const [routesEdit, setRoutesEdit] = useState(false)

    useEffect(()=>{
        //TODO: remove debug logs
        console.log("neue Route")
    },[setRoute])

    const google_api_key = process.env.REACT_APP_google_key;

    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status}...</h3>;
        if (status === Status.FAILURE) return <h3>{status}...</h3>;
        return null;
    };

    function calculateRoute(){

        const directionsService = new window.google.maps.DirectionsService();
        const departure = new window.google.maps.LatLng(route[0].departure_coords[1], route[0].departure_coords[0]);
        const arrival = new window.google.maps.LatLng(route[0].arrival_coords[1], route[0].arrival_coords[0]);

        const request = {
            origin: departure,
            destination: arrival,
            travelMode: 'TRANSIT',
            transitOptions: {modes: ['BUS', 'SUBWAY', 'TRAM'], departureTime: dayjs(route[route.length-1].departure_date).add(5, 'minutes').toDate()}
        };
        directionsService.route(request, function(result, status) {
            if (status === 'OK') {
                console.log(result)

                const newRoute = {
                    departure_coords: route[0].departure_coords,
                    arrival_coords: route[0].arrival_coords,
                    departure_date: result.routes[0].legs[0].departure_time.value,
                    departure_station: result.routes[0].legs[0].start_address.split(",")[0],
                    arrival_station: result.routes[0].legs[0].end_address.split(",")[0],
                    departureTime: result.routes[0].legs[0].departure_time.text,
                    arrivalTime: result.routes[0].legs[0].arrival_time.text,
                    changes: result.routes[0].legs[0].steps.filter((step) => step.travel_mode ==="TRANSIT").length,
                    duration: result.routes[0].legs[0].duration.text,
                    steps: result.routes[0].legs[0].steps
                }
                let existingEntries = JSON.parse(localStorage.getItem("routes"));
                if(existingEntries == null) {
                    existingEntries = [];
                }
                localStorage.setItem('routes', JSON.stringify(newRoute))
                existingEntries.push(newRoute)
                localStorage.setItem('routes', JSON.stringify(existingEntries))
                setRoute(JSON.parse(localStorage.getItem('routes')))
            }
        })
    }


    return(
        <Wrapper apiKey={google_api_key} render={render}>
        <div className="container mx-auto p-6 bg-base-100">
            <div className="flex text-lg breadcrumbs place-content-center">
                <ul>
                    <li className="font-semibold">Ticket auswählen</li>
                    <li>Login</li>
                    <li>Bezahlen</li>
                </ul>
            </div>
            {route.map((routeItem, index) => (
                <Ticket routeItem={routeItem} index={index}>
                </Ticket>
            ))}
            <button className="btn btn-accent m-6 rounded-lg" onClick={calculateRoute}>Spätere Route</button>

        </div>
    </Wrapper>
    )
}

export default DisplayTickets