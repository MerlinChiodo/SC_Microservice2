import {useContext, useEffect} from "react";
import UserContext from "../context/user/UserContext";
import {Link, useNavigate} from "react-router-dom";


function Login() {

    const navigate = useNavigate()
    const {isLoggedIn, getLoginUser} = useContext(UserContext)


    useEffect(()=>{
        if(isLoggedIn)
            navigate('/checkout')
    }, [])

    return isLoggedIn ?
        null
    : (
        <div className="container mx-auto p-6">
            <div className="flex text-lg breadcrumbs place-content-center">
                <ul>
                    <li>Ticket auswählen</li>
                    <li className="font-semibold">Login</li>
                    <li>Bezahlen</li>
                </ul>
            </div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left" onClick={() => getLoginUser(`${window.location.origin}/checkout/`, `${window.location.origin}/error/`)}>
                        <h1 className="text-5xl font-bold hover:underline ml-6">weiter mit der SmartCity</h1>
                        <p className="py-6"></p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-title mx-auto mt-6">In der Smartcity anmelden</div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login