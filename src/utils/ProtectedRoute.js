import React from 'react';
// import {Navigate, Route} from "react-router-dom";
import {Navigate} from "react-router-dom";
import AuthHandler from "./AuthHandler";


const ProtectedRoute = ({ component: Component, ...rest }) => {

    console.log({...rest});
    console.log(rest);

    const isLoggedIn = AuthHandler.loggedIn();

    return isLoggedIn ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedRoute;