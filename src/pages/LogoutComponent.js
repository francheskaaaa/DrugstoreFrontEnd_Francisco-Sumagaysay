import React from 'react';
import AuthHandler from "../utils/AuthHandler";
import {Navigate} from "react-router-dom"; // Just in case cleanup is needed

class LogoutComponent extends React.Component {
  componentDidMount() {
    AuthHandler.logout(); // Ensure that tokens are cleared
  }

  render() {
    return <Navigate to="/" />;
  }
}

export default LogoutComponent;