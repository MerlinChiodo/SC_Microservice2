import {useContext, useEffect} from "react";
import UserContext from "../context/user/UserContext";
import {Link, useNavigate} from "react-router-dom";


function Login() {

    const navigate = useNavigate()
    const {isLoggedIn, getLoginUser} = useContext(UserContext)

    const handleSubmit = (e) =>{
        e.preventDefault()

        navigate('/checkout')
    }

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
                    <div className="text-center lg:text-left" onClick={() => getLoginUser(window.location.origin, `${window.location.origin}/error/`)}>
                        <h1 className="text-5xl font-bold hover:underline ml-6">oder weiter mit der SmartCity</h1>
                        <p className="py-6"></p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-title mx-auto mt-6">Als Gast anmelden</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Vorname</span>
                                </label>
                                <input minLength={2} id="vorname"type="text" placeholder="Vorname" className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nachname</span>
                                </label>
                                <input minLength={2} id="nachname"type="text" placeholder="Nachname" className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input minLength={2} id="email" type="text" placeholder="Email" className="input input-bordered"/>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Als Gast weiter zur Bezahlung</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login