import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUserName } from '../../actions/user.action';

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [editNameFormData, setEditNameFormData] = useState({ firstName: '', lastName: '' });
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    useEffect(() => {
        if (!state.token) {
            navigate('/');
            console.log("impossible d'acceder à la page profile sans être connecté");
        }
    }, [state.token]);

    useEffect(() => {
        document.title = 'Argent Bank - User Page';
    }, []);

    const capitalizeFirstLetter = word => word.charAt(0).toUpperCase() + word.slice(1);

    const toggleEditForm = () => {
        setIsEditFormVisible(prevState => !prevState);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setEditNameFormData({
            ...editNameFormData,
            [name]: value,
        });
    };

    const submitEditNameForm = e => {
        e.preventDefault();
        const credentials = {
            ...editNameFormData,
            token: state.token,
        };
        dispatch(editUserName(credentials));
        document.getElementById('edit-name-form').reset();
        setIsEditFormVisible(false);
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {state.token && capitalizeFirstLetter(state.firstName) + ' ' + capitalizeFirstLetter(state.lastName)}!
                </h1>
                {!isEditFormVisible && (
                    <button id="edit-name-btn" onClick={toggleEditForm} className="edit-button">
                        Edit Name
                    </button>
                )}
            </div>

            {isEditFormVisible && (
                <form onSubmit={e => submitEditNameForm(e)} id="edit-name-form" className="d-none">
                    <div>
                        <label htmlFor="firstName">Prénom : </label>
                        <input onChange={e => handleChange(e)} id="firstName" type="text" name="firstName" required={true} />

                        <label htmlFor="lastName">Nom : </label>
                        <input onChange={e => handleChange(e)} id="lastName" type="text" name="lastName" required={true} />

                        <button type="submit" className="edit-button">
                            Valider
                        </button>

                        <button type="button" onClick={toggleEditForm} className="close-button">
                            X
                        </button>
                    </div>
                </form>
            )}
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
};

export default User;
