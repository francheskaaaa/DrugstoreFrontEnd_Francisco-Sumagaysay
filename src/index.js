import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
///import App from './App';
import Login from './pages/login';
import Inventory from './pages/Inventory';
import Home from './components/Home';
// import MainComponent from "./components/MainComponent";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import ProtectedRoute from "./utils/ProtectedRoute";
import LogoutComponent from "./pages/LogoutComponent";
import Config from "./utils/Config";


import { Buffer } from 'buffer';
import process from 'process';
import ProtectedRouteNew from "./utils/ProtectedRouteNew";



// Polyfill setup
window.Buffer = Buffer;
window.process = process;

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//ReactDOM.render(
    <Router>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login/>}/>
            <Route path={Config.logoutUrl} element={<LogoutComponent/>}/>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRouteNew/>}>
                <Route path="home" element={<Home/>}/>
                <Route path="inventory" element={<Inventory/>}/>
                {/* Add further child routes as needed */}
            </Route>
        </Routes>
    </Router>

)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
