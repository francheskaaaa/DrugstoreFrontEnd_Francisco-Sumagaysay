import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
///import App from './App';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { Buffer } from 'buffer';
import process from 'process';

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
            <Route path="/" element={<Login/>}/>
        </Routes>
    </Router>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
