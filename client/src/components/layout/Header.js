import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.token
        }
    }

    logout(e) {
        console.log("clicked logout");
        console.log("current token:", localStorage.token)
        localStorage.token = null;
        console.log("token after click:", localStorage.token)
    };

    render() {
        return (
            <React.Fragment>
             <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to="/">Reddit Clone</Link>
                        </div>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            { this.state.token !== null ? <Link to="/account">MyAccount</Link> : <Link to="/login">Login</Link>}
                        </li>
                        <li className="nav-item">
                            { this.state.token !== null ? <button onClick={() => this.logout()}>log out</button> : <Link to="/register">Register</Link>}
                        </li>
                    </ul>
                    </div>
                    <button className="btn btn-danger navbar-btn">Button</button>
                </div>
                </nav> 
            </React.Fragment>
        );
    }
};

export default Header;