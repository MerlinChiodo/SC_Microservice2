import React from 'react'
import Card from "../components/Card";
import {Link} from "react-router-dom";

function Employee() {

    return (
        <div className="container mx-auto 2xl">
        <div className="flex flex-row flex-wrap place-content-center mt-3">
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
            <Card  title="Anträge" text="Alle Anträge einsehen und bearbeiten">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/'>Anträge einsehen</Link>
                </button>
            </Card>
            <Card title="About Us" text="About Us auf der Landingpage bearbeiten">
                <button> <Link className="btn mt-2 btn-primary" to='/aboutusform'>About Us ändern</Link></button>
            </Card>
        </div>
        </div>
    )
}

export default Employee