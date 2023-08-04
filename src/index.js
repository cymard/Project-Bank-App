import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import './styles/_normalizer.scss';
import './styles/style.scss';

// REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';

const store = configureStore({
    reducer: userReducer,
    devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Router />
                <Footer />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
