import {useEffect} from "react";
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import {DatePicker, TimeInput} from "@mantine/dates";
import {Calendar, Clock} from "tabler-icons-react";
import dayjs from 'dayjs';
import { Wrapper, Status } from "@googlemaps/react-wrapper";



function AuskunftForm(){

    const api_url = "https://rest.busradar.conterra.de/prod/";

    const[data, setData] = useState([])

    useEffect(()=>{
        fetchStops()
        calcRoute()
    }, [])

    const fetchStops = async () => {
        const response = await fetch(api_url+ 'haltestellen')
        const stops = await response.json()
        getStops(stops)
    }

    function calcRoute(){
        var directionsService = new window.google.maps.DirectionsService();
        var haight = new window.google.maps.LatLng(37.7699298, -122.4469157);
        var oceanBeach = new window.google.maps.LatLng(37.7683909618184, -122.51089453697205);

        var request = {
            origin: haight,
            destination: oceanBeach,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
            if (status === 'OK') {
                console.log(result)
            }
        });
    }


    function getStops(stops_json) {
        let stop_names = []
        let array = []
        for (let key in stops_json.features) {
            let stop_name = stops_json.features[key].properties.lbez
            let coords = stops_json.features[key].geometry.coordinates
            stop_names.push(stop_name)
            let stops = {
                name: stop_name,
                coordinates: coords
            }
            array.push(stops)
        }
        setData(stop_names)
    }

    return(
        <div className="flex flex-auto place-content-center">
            <form onSubmit={()=> console.log("")}  className="card w-1/2 bg-base-200 shadow-sm p-6" >
                <div className="grid grid-cols-2 gap-6 place-items-center place-items-stretch">
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="abfahrt-haltestelle">von</label>
                        <Autocomplete
                            id="abfahrt_haltestelle"
                            data={data}
                            styles={{
                                input: {borderRadius: 10}
                            }}>
                        </Autocomplete>
                    </div>

                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">nach</label>
                            <Autocomplete
                                id="ankunfts_haltestelle"
                                className=""
                                data={data}
                                styles={{
                                    input: {borderRadius: 10}
                                }}>
                            </Autocomplete>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 place-items-center place-items-stretch">
                    <div>
                        <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">am</label>
                        <DatePicker id="datepicker"
                                    styles={{
                                        input: {borderRadius: 10, height: "auto", lineHeight: 2.5},
                                    }}
                                    placeholder="Datum auswählen"
                                    icon={<Calendar size={16}/>}
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
                            />
                    </div>
                </div>


                <button type="submit"
                        className="text-white mt-6 btn-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Route finden
                </button>
            </form>
        </div>
    )
}

export default AuskunftForm