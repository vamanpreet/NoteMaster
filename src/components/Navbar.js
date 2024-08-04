import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom';

const Navbar = () => {
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#02162c'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">NoteMatser</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link to="/login" role='button' className="btn btn-primary mx-2">Login</Link>
                        <Link to="/signup" role='button' className="btn btn-primary mx-2">Signup</Link>
                    </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
