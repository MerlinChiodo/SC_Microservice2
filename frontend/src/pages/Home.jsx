import React, {useContext, useEffect} from 'react'
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import AuskunftForm from "./AuskunftForm";
import UserContext from "../context/user/UserContext";
import Map from "./Map";

function Home() {

    const google_api_key = process.env.REACT_APP_google_key;

    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status}...</h3>;
        if (status === Status.FAILURE) return <h3>{status}...</h3>;
        return null;
    };



    return (
        <div className="container mx-auto p-6 bg-base-100">
            <div>
                <Wrapper apiKey={google_api_key} render={render}>
                    <AuskunftForm></AuskunftForm></Wrapper>
            </div>
            <Map></Map>
        </div>
    )
}

export default Home