import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import './styles/_normalizer.scss';
import './styles/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header />
            <Router />
            <Footer />
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
