import dayjs from "dayjs";

export function calculateRoute(departure_coords, arrival_coords){

    const directionsService = new window.google.maps.DirectionsService();
    const departure = new window.google.maps.LatLng(departure_coords[1], departure_coords[0]);
    const arrival = new window.google.maps.LatLng(arrival_coords[1], arrival_coords[0]);
    const departureTime = dayjs(time).toDate()

    const request = {
        origin: departure,
        destination: arrival,
        travelMode: 'TRANSIT',
        transitOptions: {modes: ['BUS', 'SUBWAY', 'TRAM'], departureTime: departureTime}
    };
    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            console.log(result)

            try {
                localStorage.setItem('routes', JSON.stringify([{
                    departure_station: result.routes[0].legs[0].start_address.split(",")[0],
                    arrival_station: result.routes[0].legs[0].end_address.split(",")[0],
                    departureTime: result.routes[0].legs[0].departure_time.text,
                    arrivalTime: result.routes[0].legs[0].arrival_time.text,
                    changes: result.routes[0].legs[0].steps.filter((step) => step.travel_mode ==="TRANSIT").length,
                    duration: result.routes[0].legs[0].duration.text,
                    steps: result.routes[0].legs[0].steps
                }
                ]))
                setRoute(JSON.parse(localStorage.getItem('routes')))
                setIsRouteValid(true)
                navigate("/ticket")
            } catch (e) {
                console.log("keine gültige Busverbindung")
                setIsRouteValid(false)
            }
        }
    })
}