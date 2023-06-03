import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (


        <nav className='navbar navbar-expand-lg bg-light'>
            <div className="container-fluid">
                <Link className="navbar-brand" to="login">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="login">Home</Link>
                        <Link to="register" className='nav-link'>Registeration</Link>
                        <Link to="login" className='nav-link'>Login</Link>
                        <Link to="rootCRUDS" className='nav-link'>rootCRUDS</Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar