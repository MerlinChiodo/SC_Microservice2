import Ticket from "../components/Ticket";


function DisplayTickets() {




    return(
        <div className="container mx-auto p-6 bg-base-100">
            <div className="flex text-sm breadcrumbs place-content-center">
                <ul>
                    <li><a>Ticket auswählen</a></li>
                    <li><a>Login</a></li>
                    <li><a>Bezahlen</a></li>
                </ul>
            </div>
            <Ticket>
            </Ticket>
        </div>
    )

}

export default DisplayTickets