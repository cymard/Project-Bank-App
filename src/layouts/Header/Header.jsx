import React from 'react';
import argentBankLogo from './images/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/user.action';

const Header = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const handleLogout = () => dispatch(logoutUser());

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {!token ? (
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-sign-in"></i>
                        Sign In
                    </Link>
                ) : (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            Tony
                        </Link>
                        <Link onClick={handleLogout} to="/" className="main-nav-item">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
