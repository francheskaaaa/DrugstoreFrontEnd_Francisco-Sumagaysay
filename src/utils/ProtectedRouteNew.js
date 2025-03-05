import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainComponent from "../components/MainComponent";
import AuthHandler from "./AuthHandler";

const ProtectedRouteNew = ({ page }) => {
  const isLoggedIn = AuthHandler.loggedIn(); // Authentication logic

  return isLoggedIn ? <MainComponent page={page}><Outlet /></MainComponent> : <Navigate to="/" />;
};

export default ProtectedRouteNew;