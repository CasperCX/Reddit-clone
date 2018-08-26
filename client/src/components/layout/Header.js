import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';


  
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authModal: true,
            token: localStorage.token
        }

        this.logout = this.logout.bind(this)
    }

    onAuth = () => {
        this.setState({ authModal: !this.state.authModal });
      };
      

    logout(dispatch) {
        console.log("current token:", localStorage.token)
        localStorage.token = '';
        localStorage.user_id = null;
        console.log("token after click:", localStorage.token)
        this.forceUpdate();

        dispatch({type: "LOGOUT_USER"  });
    };

    consolethis() {
        console.log("clicked it");
    }
     //TODO CANT FIND LOGOUT FROM HERE
     //TODO MAKE RESET MODAL FUNCTION ON ALL LINKS?
    nav() {
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
                        { localStorage.token !== '' ? 
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/account">MyAccount</Link></li>
                            <li className="nav-item"><button onClick={() => this.logout()}>logout</button></li>
                        </ul> :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/login">Login</Link></li>
                            <li className="nav-item"><Link to="/register">Register</Link></li>
                        </ul>
                        }
                    </div>
                </div>
            </nav>
        </React.Fragment>
        )
    };

    render() {
        //const { render } = this.props;
        // return (
        //     <React.Fragment>
        //         <div>{render({
        //             authModal: this.state.authModal,
        //             onAuth: this.onAuth,
        //             nav: this.nav
        //         })}</div>
        //         { console.log("current jwt: ", localStorage.token) }
        //     </React.Fragment>
        // );
        return (
                <Consumer>
                    {value => {
                        const { dispatch } = value;
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
                                        { localStorage.token !== '' ? 
                                        <ul className="navbar-nav ml-auto">
                                            <li className="nav-item"><Link to="/account">MyAccount</Link></li>
                                            <li className="nav-item"><button onClick={() => this.logout(dispatch)}>logout</button></li>
                                        </ul> :
                                        <ul className="navbar-nav ml-auto">
                                            <li className="nav-item"><Link to="/login">Login</Link></li>
                                            <li className="nav-item"><Link to="/register">Register</Link></li>
                                        </ul>
                                        }
                                    </div>
                                </div>
                            </nav>
                        </React.Fragment>
                        )
                     }}
                </Consumer>
                )
            }
        };








class NavOut extends Component {
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
                        { localStorage.token !== '' ? 
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/account">MyAccount</Link></li>
                            <li className="nav-item"><button onClick={() => this.logout()}>logout</button></li> 
                        </ul> :
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to="/login">Login</Link></li>
                            <li className="nav-item"><Link to="/register">Register</Link></li>
                        </ul>
                        }
                    </div>
                </div>
            </nav>
        </React.Fragment>
        )
    }};

export default Header;