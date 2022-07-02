import {Link} from "react-router-dom";
import UserContext from "../context/user/UserContext";
import {useContext} from "react";

function Footer() {

    const {getLoginUser, logout, isLoggedIn, isAdminLoggedIn, logoutAdmin, getLoginAdmin} = useContext(UserContext)

    return(
        <>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <span className="footer-title">Services</span>
                    <div className="link link-hover"
                         onClick={() => getLoginAdmin(`${window.location.origin}/employee/`, `${window.location.origin}/error/`)}
                    >
                        Mitarbeiter
                    </div>
                </div>
                <div>
                    <span className="footer-title">SmartCity</span>
                    <a className="link link-hover" href='http://www.supersmartcity.de/'>
                        Landingpage
                    </a>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">

            </footer>
        </>
    )
}

export default Footer