import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PrivateRoute() {
    // const [isAuth, setIsAuth] = useState(false);

    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem('access_token') !== null;
    //     setIsAuth(isAuthenticated);
    //     console.log(isAuth); // Check the value retrieved from local storage
    //     console.log("isAuth1"); // Log a message to ensure the useEffect hook is running
    // }, []); // Empty dependency array to ensure useEffect runs only once

    const isAuthenticated = localStorage.getItem('access_token') !== null;
    // If authenticated, render child components, otherwise redirect to login
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
