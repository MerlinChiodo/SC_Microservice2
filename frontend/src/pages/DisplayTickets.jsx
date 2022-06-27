import Ticket from "../components/Ticket";
import {useContext} from "react";
import RouteContext from "../context/route/RouteContext";


function DisplayTickets() {

    const {route} = useContext(RouteContext)

    return(
        <div className="container mx-auto p-6 bg-base-100">
            <div className="flex text-lg breadcrumbs place-content-center">
                <ul>
                    <li className="font-semibold">Ticket auswählen</li>
                    <li>Login</li>
                    <li>Bezahlen</li>
                </ul>
            </div>
            {route.map((routeItem, index) => (
                <Ticket routeItem={routeItem} index={index}>
                </Ticket>
            ))}

        </div>
    )

}

export default DisplayTickets