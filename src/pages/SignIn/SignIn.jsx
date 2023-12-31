import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/user.action';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);

    useEffect(() => {
        if (token) {
            navigate('/profile');
        }
    }, [token]);

    useEffect(() => {
        document.title = 'Argent Bank - Sign in Page';
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const extractFirstNameAndLastNameFromEmail = email => {
        const firstName = email.substring(0, email.indexOf('@'));
        const lastName = email.substring(email.indexOf('@') + 1, email.indexOf('.'));

        return { firstName, lastName };
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { firstName, lastName } = extractFirstNameAndLastNameFromEmail(formData.username);
        const credentials = {
            email: formData.username,
            password: formData.password,
            firstName: firstName,
            lastName: lastName,
        };

        dispatch(loginUser(credentials));
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={e => handleChange(e)}
                            value={formData.username}
                            name="username"
                            type="text"
                            id="username"
                            autoComplete="username"
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={e => handleChange(e)}
                            value={formData.password}
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
