import React from 'react';
import argentBankLogo from './images/argentBankLogo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="/profile" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Tony
                </Link>
                <Link to="/login" className="main-nav-item">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    );
};

export default Header;
