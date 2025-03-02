import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import logo from './assets/logo-sub.png';
import AuthHandler from "./utils/AuthHandler";
class Login extends React.Component {

    state={
        username: '',
        password: '',
        btnDisabled: true,
        loginStatus:0,
    }
    saveInputs = (events) => {
        var key = events.target.name;
        this.setState({[key]: events.target.value});
        if(this.state.username !== '' && this.state.password !== ''){
            this.setState({btnDisabled: false});
        }
        else{
            this.setState({btnDisabled: true});
        }
    }

    formSubmit = (events) => {
        events.preventDefault();
        console.log(this.state);

        this.setState({loginStatus:1});

        AuthHandler.login(this.state.username,this.state.password,this.handleAjaxResponse);
    };

    handleAjaxResponse = (data) => {
        console.log(data);
        if(data.error){
            this.setState({loginStatus:4});
        }
        else {
            this.setState({loginStatus:3})
        }
    };

    getMessages = () => {
        if(this.state.loginStatus === 0){
            return "";
        }
        else if(this.state.loginStatus === 1){
            return <div className="text-center text-yellow-500 mt-2">Logging in...</div>
        }
        else if(this.state.loginStatus === 3){
            return <div className="text-center text-green-500 mt-2">Login successful</div>
        }
        else if(this.state.loginStatus === 4){
            return <div className="text-center text-red-500 mt-2">Invalid username or password</div>
        }
    }

    render() {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-4xl shadow-lg">
                    {/* Left Side */}
                    <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-700">Login</h2>
                        <form id="Login" method="POST" onSubmit={this.formSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2" htmlFor="username">
                                    Username or Email
                                </label>
                                <div className="relative">
                                    <input
                                        name="username"
                                        className="w-full pl-4 pr-7 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        type="text"
                                        id="username"
                                        placeholder="Username or Email"
                                        required
                                        onChange={this.saveInputs}
                                    />
                                    <i className="fas fa-user absolute right-3 top-3 text-gray-400"></i>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        className="w-full pl-4 pr-7 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        required
                                        onChange={this.saveInputs}
                                    />

                                    <i className="fas fa-lock absolute right-3 top-3 text-gray-400"></i>
                                </div>
                            </div>
                            <div className="mb-6 text-right">
                                <button
                                    type="button"
                                    className="text-purple-600 hover:underline bg-transparent border-0 p-0"
                                    onClick={() => {
                                        // Handle forgot password functionality here
                                        console.log('Forgot Password clicked');
                                    }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-violet-900 text-white py-2 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"

                                disabled={this.state.btnDisabled}
                            >
                                Login
                            </button>
                            {this.getMessages()}
                        </form>
                    </div>
                    {/* Right Side */}
                        {/*<h1 className="text-6xl text-white font-bold">LOGO</h1>*/}

                    <div className="w-1/2 bg-gradient-to-b from-cyan-800 to-violet-900 flex flex-col justify-center items-center">
                        <img src={logo} alt="Logo" className="w-60 object-contain mb-4" />
                        <h2 className="text-4xl text-white font-poppins font-bold">Diane's Drugstore</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;