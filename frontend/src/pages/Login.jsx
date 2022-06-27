import {useContext} from "react";
import UserContext from "../context/user/UserContext";
import {Link} from "react-router-dom";


function Login() {

    const {isLoggedIn} = useContext(UserContext)

    return isLoggedIn ? (
        <div className="container mx-auto">
            <div className="hero min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Bereits in der SmartCity angemeldet</h1>
                        <p className="py-6"></p>
                        <Link to='/checkout'><button className="btn btn-primary">Weiter zur Zahlung</button></Link>
                    </div>
                </div>
            </div>
        </div>

    ) : (
        <div className="container mx-auto p-6">
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Link to='/checkout'><h1 className="text-5xl font-bold hover:underline">oder weiter mit der SmartCity.</h1></Link>
                        <p className="py-6"></p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-title mx-auto mt-6">Als Gast anmelden</div>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Vorname</span>
                                </label>
                                <input type="text" placeholder="Vorname" className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nachname</span>
                                </label>
                                <input type="text" placeholder="Nachname" className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Email" className="input input-bordered"/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Als Gast weiter zur Bezahlung</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login