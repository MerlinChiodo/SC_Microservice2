import {useContext, useEffect} from "react";
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import {DatePicker, TimeInput} from "@mantine/dates";
import {Calendar, Clock} from "tabler-icons-react";
import RouteContext from "../context/route/RouteContext";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/user/UserContext";


function AuskunftForm(){

    const {setRoute, clearRoute} = useContext(RouteContext)
    const {isLoggedIn, user} = useContext(UserContext)
    const navigate = useNavigate();
    const api_url = "https://rest.busradar.conterra.de/prod/";

    const[stops, setStops] = useState(new Set())
    const[time, setTime] = useState(new Date())
    const[isRouteValid, setIsRouteValid] = useState(false)
    const[homeAddress, setHomeAddress] = useState("")

    useEffect(()=>{
        fetchStops()
    }, [])

    useEffect(()=>{
        if(isLoggedIn && user.user_data.address !==undefined){
            setHomeAddress(`${user.user_data.address.street} ${user.user_data.address.housenumber}, ${user.user_data.address.city_code} ${user.user_data.address.city}`)
        }
    }, [isLoggedIn])

    const fetchStops = async () => {
        const response = await fetch(api_url+ 'haltestellen')
        const stops = await response.json()
        getStops(stops)
    }

    function getStops(stops_json) {
        let stops = new Set()
        for (let key in stops_json.features) {
            let stop_name = stops_json.features[key].properties.lbez
            let coords = stops_json.features[key].geometry.coordinates

            let stop = {
                name: stop_name,
                coordinates: coords
            }
            stops.add(stop)
        }
        setStops(stops)
    }
    //TODO: remove code duplication
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
                    localStorage.setItem('routes', JSON.stringify([{
                        departure_station: result.routes[0].legs[0].start_address.split(",")[0],
                        departure_coords: departure_coords,
                        arrival_coords: arrival_coords,
                        departure_date: result.routes[0].legs[0].departure_time.value,
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const coords_departure = [...stops].find(stop => stop.name===e.target.abfahrt_haltestelle.value).coordinates
        const coords_arrival = [...stops].find(stop => stop.name===e.target.ankunfts_haltestelle.value).coordinates
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
                            data={[...stops].map((stop)=> stop["name"])}
                            styles={{
                                input: {borderRadius: 10}
                            }}
                            placeholder="Bahnhof/Haltestelle"
                           /* data={[{value: homeAddress, group: "zuhause"},
                            ]}*/
                            required
                        >
                        </Autocomplete>
                    </div>
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">nach</label>
                            <Autocomplete
                                id="ankunfts_haltestelle"
                                data={[...stops].map((stop)=> stop["name"])}
                                minLength={2}
                                styles={{
                                    input: {borderRadius: 10}
                                }}
                                required
                                placeholder="Bahnhof/Haltestelle"
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
                <button id='route_button' type="submit" className="mt-6 place-self-center w-fit text-white btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Route finden
                </button>
            </form>
        </div>
    )
}

export default AuskunftForm