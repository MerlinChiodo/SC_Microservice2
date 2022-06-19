import {useEffect} from "react";
import { useState } from 'react';
import { Autocomplete } from '@mantine/core';
import Map from "../pages/Map";

function AuskunftForm(){

    const api_url = "https://rest.busradar.conterra.de/prod/";

    const[data, setData] = useState([])

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
            stops.push(stop_name)
        }
        setData(stops)
    }

    return(
        <>
            <form onSubmit={()=> console.log("")} className="grid " >
                <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="abfahrt-haltestelle">Haltestelle</label>
                <Autocomplete
                    id="abfahrt_haltestelle"
                    className="basis-1/2"
                    data={data}
                    styles={{
                        input: {borderRadius: 10}
                    }}>
                </Autocomplete>

                <label className="mb-2 text-sm font-medium text-gray-900" htmlFor="ankunfts_haltestelle">Haltestelle</label>
                <Autocomplete
                    id="ankunfts_haltestelle"
                    className="basis-1/2"
                    data={data}
                    styles={{
                        input: {borderRadius: 10}
                    }}>
                </Autocomplete>
            </form>
        </>
    )
}

export default AuskunftForm