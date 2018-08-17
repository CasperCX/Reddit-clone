import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.token
        }
    }

    logout() {
        console.log("current token:", localStorage.token)
        localStorage.token = '';
        console.log("token after click:", localStorage.token)
        this.forceUpdate();
   
    };

    showStuff() {
        if (localStorage.token !== '') {
            return <div><Link to="/account">MyAccount</Link><button onClick={() => this.logout()}>logout</button></div>
        } else {
            return <Link to="/login">Login</Link>
        }
    }

    render() {
        return (
            <React.Fragment>
                { console.log("current jwt: ", localStorage.token) }
                { console.log("jwt length: ", localStorage.token.length) }
             <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to="/">Reddit Clone</Link>
                        </div>
                    </div>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    
                    {/* <ul className="navbar-nav ml-auto"> */}
                        {this.showStuff()}
                    {/* </ul> */}
                    </div>

                </div>
                </nav> 
            </React.Fragment>
        );
    }
};

export default Header;