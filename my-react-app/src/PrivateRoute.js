import React from 'react';
import {Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook if not already imported
import Login from './pages/Login'

const PrivateRoute = () => {
    // const auth = null; // determine if authorized, from context or however you're doing it
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("userId") !== null;
    });
    const navigate = useNavigate();

    // If authorized, return an outlet that will render child elements
    // If not, navigate to the login page
    if (isLoggedIn) {
        return <Outlet />;
    } else {
        // navigate("/login");
        // <Navigate to="/login"/>
        return <Login/>;
    }
}

export default PrivateRoute;