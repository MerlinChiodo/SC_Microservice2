import React from 'react'
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {sendCalendarEntry} from "../eventController";

function Employee() {

    return (
        <>
            <Card title="Kalender" text="Neuer Kalender Eintrag für das Forum">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/calendarform'>Eintrag hinzufügen</Link>
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