import {useContext, useEffect} from "react";
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import {DatePicker, TimeInput} from "@mantine/dates";
import {Calendar, Clock} from "tabler-icons-react";
import RouteContext from "../context/route/RouteContext";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function AuskunftForm(){

    const {setRoute, clearRoute} = useContext(RouteContext)
    const navigate = useNavigate();
    const api_url = "https://rest.busradar.conterra.de/prod/";

    const[stops, setStops] = useState([])
    const[time, setTime] = useState(new Date())
    const[isRouteValid, setIsRouteValid] = useState(false)

    useEffect(()=>{
        fetchStops()
    }, [])

    const fetchStops = async () => {
        const response = await fetch(api_url+ 'haltestellen')
        const stops = await response.json()
        getStops(stops)
    }

    function getStops(stops_json) {
        let stops = []
        for (let key in stops_json.features) {
            let stop_name = stops_json.features[key].properties.lbez
            let coords = stops_json.features[key].geometry.coordinates

            let stop = {
                name: stop_name,
                coordinates: coords
            }
            stops.push(stop)
        }
        setStops(stops)
    }

    const calculateRoute = (departure_coords, arrival_coords) => {

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
                    setRoute({
                        line: result.routes[0].legs[0].steps.find((step) => step.travel_mode === "TRANSIT").transit.line.short_name,
                        headsign: result.routes[0].legs[0].steps.find((step) => step.travel_mode === "TRANSIT").transit.headsign,
                        num_stops: result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.num_stops,
                        departure_station: result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.departure_stop.name,
                        arrival_station: result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.arrival_stop.name,
                        departureTime: result.routes[0].legs[0].departure_time.text,
                        arrivalTime: result.routes[0].legs[0].arrival_time.text,
                        changes: result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").length,
                        duration: result.routes[0].legs[0].duration.text
                    })
                } catch (e) {
                    console.log("keine gültige Busverbindung")
                    setIsRouteValid(false)
                }
                setIsRouteValid(true)
                navigate("/ticket")
              /*  //Ticket erstellen wenn nur es nicht nur WALKING gibt
                console.log(result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.line.short_name)
                console.log(result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.headsign)
                console.log(result.routes[0].legs[0].steps.find((step) => step.travel_mode ==="TRANSIT").transit.num_stops)
                console.log(result.routes[0].legs[0].departure_time.text)
                console.log(result.routes[0].legs[0].arrival_time.text)*/
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const coords_departure = stops.find(stop => stop.name===e.target.abfahrt_haltestelle.value).coordinates
        const coords_arrival = stops.find(stop => stop.name===e.target.ankunfts_haltestelle.value).coordinates
        clearRoute()
        calculateRoute(coords_departure, coords_arrival)
    }

    return(
        <div className="flex flex-auto place-content-center">
            <form onSubmit={handleSubmit}  className="card w-1/2 bg-base-200 shadow-sm p-6" >
                <div className="grid grid-cols-2 gap-6 place-items-center place-items-stretch">
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="abfahrt-haltestelle">von</label>
                        <Autocomplete
                            minLength={2}
                            id="abfahrt_haltestelle"
                            data={stops.map((stop)=> stop["name"])}
                            styles={{
                                input: {borderRadius: 10}
                            }}
                            required
                        >
                        </Autocomplete>
                    </div>
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">nach</label>
                            <Autocomplete
                                id="ankunfts_haltestelle"
                                data={stops.map((stop)=> stop["name"])}
                                minLength={2}
                                styles={{
                                    input: {borderRadius: 10}
                                }}
                                required
                            >
                            </Autocomplete>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 place-items-center place-items-stretch">
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">am</label>
                        <DatePicker
                                    styles={{
                                        input: {borderRadius: 10, height: "auto", lineHeight: 2.5},
                                    }}
                                    placeholder="Datum auswählen"
                                    icon={<Calendar size={16}/>}
                                    required
                                    defaultValue={new Date()}
                        ></DatePicker>
                    </div>
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">um</label>
                        <TimeInput

                                styles={{
                                    input: {borderRadius: 10, height: "auto", lineHeight: 2.86},
                                }}
                                placeholder="Pick time"
                                icon={<Clock size={16} />}
                                defaultValue={new Date()}
                                value={time}
                                onChange={setTime}
                                format='24'
                                required
                            />
                    </div>
                </div>

{/*                    <button type="submit" className=" mt-6">
                        <Link to='/ticket' className="place-self-center w-fit text-white btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Route finden</Link>
                    </button>*/}
                <button id='route_button' type="submit" className="mt-6 place-self-center w-fit text-white btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Route finden
                </button>
            </form>
        </div>
    )
}

export default AuskunftForm