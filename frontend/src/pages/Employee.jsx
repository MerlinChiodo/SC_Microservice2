import React from 'react'
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react'

function Employee() {

    const backendurl = "http://" + window.location.host +"/event/"
    //test: funktioniert lokal aber nicht auf dem server
    async function handleClick(){
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            referrerPolicy: 'no-referrer',
            redirect: 'follow',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_id: 2002,
                event_name: "New Calendar Entry",
                service_name: "stadtbus",
                title: "Bus Event",
                short_description: "Smarte Events im Stadtbus",
                long_description: "Lorem Ipsum",
                event_on: "22.05.2022" }),
        };
            const response = await fetch(backendurl + "sendCalendarEntry", requestOptions)
            const data = await response.json()
    }

    return (
        <>
            <Card title="Kalender" text="Neuer Kalender Eintrag für das Forum">
                <button onClick={handleClick} className="btn mt-2 btn-primary" to="/employee">Eintrag hinzufügen
                </button>
            </Card>
            <Card title="Newsletter" text="Neuer Newsletter Artikel für das Forum">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/articleform'>Artikel hinzufügen</Link>
                </button>
            </Card>
            <Card title="Anträge" text="Alle Anträge einsehen und bearbeiten">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/'>Anträge einsehen</Link>
                </button>
            </Card>
            <Card title="About Us" text="About Us auf der Landingpage bearbeiten">
                <button className="btn mt-2 btn-primary"> About Us ändern</button>
            </Card>
        </>
    )
}

export default Employee