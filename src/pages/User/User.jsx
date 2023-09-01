import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUserName, getUserInformations } from '../../actions/user.action';

const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const firstName = useSelector(state => state.firstName);
    const lastName = useSelector(state => state.lastName);
    const token = useSelector(state => state.token);
    const [editNameFormData, setEditNameFormData] = useState({ firstName: '', lastName: '' });
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [isError, setIsError] = useState({ status: false, message: '' });

    useEffect(() => {
        if (!token) {
            navigate('/');
            console.log("impossible d'acceder à la page profile sans être connecté");
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            dispatch(getUserInformations(token));
        }
    }, [firstName, lastName]);

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

    const isErrorForm = () => {
        if (editNameFormData.firstName === '' || editNameFormData.lastName === '') {
            setIsError({ status: true, message: 'Veuillez remplir tous les champs' });
            return true;
        }

        setIsError({ status: false, message: '' });
        return false;
    };

    const submitEditNameForm = e => {
        e.preventDefault();
        if (isErrorForm()) {
            return;
        }

        const credentials = {
            ...editNameFormData,
            token: token,
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
                    {firstName && capitalizeFirstLetter(firstName) + ' '}
                    {lastName && capitalizeFirstLetter(lastName)}
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
                        {isError.status && <p className="error-message">{isError.message}</p>}
                        <label htmlFor="firstName">Prénom : </label>
                        <input
                            onChange={e => handleChange(e)}
                            id="firstName"
                            type="text"
                            name="firstName"
                            required={true}
                            autoComplete="given-name"
                        />

                        <label htmlFor="lastName">Nom : </label>
                        <input onChange={e => handleChange(e)} id="lastName" type="text" name="lastName" required={true} autoComplete="family-name" />

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
