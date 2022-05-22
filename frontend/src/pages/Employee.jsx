import Card from "../components/Card";
import {Link} from "react-router-dom";

function Employee() {
    return (
        <>
            <Card title="Kalender" text="Neuer Kalender Eintrag für das Forum">
                <button className="btn mt-2 btn-primary">Eintrag hinzufügen</button>
            </Card>
            <Card title="Newsletter" text="Neuer Newsletter Artikel für das Forum">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/articleform'>Artikel hinzufügen</Link>
                </button>
            </Card>
            <Card title="Anträge" text="Alle Anträge einsehen und bearbeiten">
                <button>
                    <Link className="btn mt-2 btn-primary" to='/articleform'>Anträge einsehen</Link>
                </button>
            </Card>
        </>
    )
}

export default Employee