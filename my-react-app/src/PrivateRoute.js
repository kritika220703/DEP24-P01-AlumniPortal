import React from 'react';
import {Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState hook if not already imported

// Moved ProtectedRoute outside of App component
// const ProtectedRoute = ({ element: Element, ...rest }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(() => {
//       return localStorage.getItem("userId") !== null;
//     });
  
//     return isLoggedIn ? (
//       <Route {...rest} element={<Element />} />
//     ) : (
//       <Navigate to="/login" replace />
//     );
//   };

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
        navigate('/login');
        return null;
    }
}

export default PrivateRoute;