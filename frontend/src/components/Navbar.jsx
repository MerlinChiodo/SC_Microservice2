import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({ title }) {
    return (
        <nav className="navbar bg-base-300 sticky top-0 z-40">
            <div className="flex-1">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-5 h-5 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <Link to='/home'className="btn btn-ghost normal-case text-xl">{title}</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link to='/tickets'>
                            Tickets
                        </Link>
                    </li>
                    <li tabIndex="0">
                        <a>
                            Infos & Meldungen
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 24 24">
                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                            </svg>
                        </a>
                        <ul className="p-2 bg-base-100 ">
                            <li><a>Fahrtauskunft</a></li>
                            <li><a>Aktuelle Störungen</a></li>
                        </ul>
                    </li>
                    <li>
                        <Link to='/employee'>
                            Mitarbeiter
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
)
}

Navbar.defaultProps = {
    title: 'Stadtbus',
}

Navbar.propTypes = {
    title: PropTypes.string,
}

export default Navbar