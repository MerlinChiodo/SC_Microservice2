import {Link} from "react-router-dom";

function Error() {
    return(
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">Fehler bei der Anmeldung</h1>
                    <Link to='/'><p className="py-6 text-lg hover:text-secondary">zurück zur Startseite</p></Link>
                </div>
            </div>
        </div>
    )

}

export default Error