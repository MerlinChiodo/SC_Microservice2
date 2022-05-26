import Card from "../components/Card";
import {Link} from "react-router-dom";
import {useEffect, useState} from 'react'

const backendurl = "http://vps2290194.fastwebserver.de:9720/event/"
//const backendurl = "http://localhost:3001/event/"

function Employee() {

    //test
    const handleClick = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_id: 2002,
                event_name: 'New Calendar Entry',
                service_name: 'stadtbus',
                title: "Bus Event",
                short_description: "Smarte Events im Stadtbus",
                long_description: "Lorem Ipsum",
                event_on: "22.05.2022", }),
        }
            const response = await fetch(backendurl + "sendCalendarEntry", requestOptions)
            const data = await response.json()
            this.calendarResponse = data;
    }

    return (
        <>
            <Card title="Kalender" text="Neuer Kalender Eintrag für das Forum">
                <button onClick={handleClick}>
                    <Link className="btn mt-2 btn-primary" to='/sendCalendar'>Eintrag hinzufügen</Link>
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