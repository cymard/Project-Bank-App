import React from 'react';
import { Route, Routes } from 'react-router-dom';

function Router () {
    return (
        <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/sign-in" element={<h1>Sign-in</h1>} />
            <Route path="/user" element={<h1>User</h1>} />
        </Routes>
    );
}

export default Router;
