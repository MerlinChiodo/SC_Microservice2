import Ticket from "../components/Ticket";
import {useContext} from "react";
import RouteContext from "../context/route/RouteContext";


function DisplayTickets() {

    const {route, setRoute} = useContext(RouteContext)


    return(
        <div className="container mx-auto p-6 bg-base-100">
            <div className="flex text-sm breadcrumbs place-content-center">
                <ul>
                    <li><a className="font-semibold">Ticket auswählen</a></li>
                    <li>Login</li>
                    <li>Bezahlen</li>
                </ul>
            </div>
            <Ticket route={route}>
            </Ticket>
        </div>
    )

}

export default DisplayTickets