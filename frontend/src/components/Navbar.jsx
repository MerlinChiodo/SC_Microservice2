import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Logout} from "tabler-icons-react";
import UserContext from "../context/user/UserContext";
import {useContext} from "react";


function Navbar({ title, children }) {


    const {getLoginUser, logout, isLoggedIn} = useContext(UserContext)

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
                            <Link to='/'className="btn btn-ghost normal-case text-xl">{title}</Link>
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
                                    <div className='btn btn-ghost normal-case rounded-xl place-content-center' >
                                        {!isLoggedIn && (<Login
                                                            onClick={() => getLoginUser('http://localhost:3000/', 'http://localhost:3000/employee')}
                                                            size={28}
                                                            strokeWidth={1}
                                                            color={'black'}>
                                                        </Login>)}

                                            {isLoggedIn && (<Logout
                                                            onClick={logout}
                                                            size={28}
                                                            strokeWidth={1}
                                                            color={'black'}>
                                                        </Logout>)}
                                    </div>
                                </li>
                                <li>
                                    <a className='btn btn-ghost normal-case rounded-xl place-content-center' href='http://www.supersmartcity.de/'>
                                        Redirect-Platzhalter
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
                            <Link to='/' className="btn btn-ghost normal-case rounded-xl">
                                Home
                            </Link>
                        </li>
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