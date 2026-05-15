import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(props) {
    const [county, setCounty] = useState('Select Country')

    const location = useLocation();

    const handleCountrySelect = (county) => {
        setCounty(county);
        props.setCountry(county)
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse overflow-x-auto" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/business' ? 'active' : ''}`} to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/domestic' ? 'active' : ''}`} to="/domestic">Domestic</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`} to="/education">Education</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/entertainment' ? 'active' : ''}`} to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/environment' ? 'active' : ''}`} to="/environment">Environment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/food' ? 'active' : ''}`} to="/food">Food</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/health' ? 'active' : ''}`} to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/lifestyle' ? 'active' : ''}`} to="/lifestyle">Lifestyle</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/politics' ? 'active' : ''}`} to="/politics">Politics</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/science' ? 'active' : ''}`} to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/sports' ? 'active' : ''}`} to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/technology' ? 'active' : ''}`} to="/technology">Technology</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/tourism' ? 'active' : ''}`} to="/tourism">Tourism</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/world' ? 'active' : ''}`} to="/world">World</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="dropdown">
                        <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {county}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item btn" onClick={(e) => {e.preventDefault(); handleCountrySelect('PK')}}>PK</a></li>
                            <li><a className="dropdown-item btn" onClick={(e) => {e.preventDefault(); handleCountrySelect('IN')}}>IN</a></li>
                            <li><a className="dropdown-item btn" onClick={(e) => {e.preventDefault(); handleCountrySelect('USA')}}>USA</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
