import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login} from "tabler-icons-react";
import UserContext from "../context/user/UserContext";
import {useContext} from "react";


function Navbar({ title, children }) {


    const {getLoginUser} = useContext(UserContext)

    return (
            <div className="drawer ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    <div className="w-full navbar bg-base-300 sticky top-0 z-40">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="inline-block w-6 h-6 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">
                            <Link to='/home'className="btn btn-ghost normal-case text-xl">{title}</Link>
                        </div>

                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <li>
                                    <Link to='/tickets' className="btn btn-ghost normal-case rounded-xl">
                                        Tickets
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/employee' className="btn btn-ghost normal-case rounded-xl">
                                        Mitarbeiter
                                    </Link>
                                </li>
                                <li>
                                    <a className='btn btn-ghost normal-case rounded-xl' href='http://auth.smartcityproject.net:8080/external?redirect_success=https://www.google.com/&redirect_error=https://www.google.com/'>
                                        <Login
                                            onClick={() => getLoginUser('https://www.google.com/', 'https://www.google.com/')}
                                            size={28}
                                            strokeWidth={1}
                                            color={'black'}></Login>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                        <li>
                            <Link to='/tickets' className="btn btn-ghost normal-case rounded-xl">
                                Tickets
                            </Link>
                        </li>
                        <li>
                            <Link to='/employee' className="btn btn-ghost normal-case rounded-xl">
                                Mitarbeiter
                            </Link>
                        </li>

                    </ul>

                </div>
            </div>
)
}

Navbar.defaultProps = {
    title: 'Stadtbus',
}

Navbar.propTypes = {
    title: PropTypes.string,
}

export default Navbar