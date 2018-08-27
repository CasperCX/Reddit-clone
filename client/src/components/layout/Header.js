import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';


  
export class Header extends Component {
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
      

    logout() {
        const { dispatch } = this.props.context;
        console.log("current token:", localStorage.token)
        // localStorage.clear();
        localStorage.token = '';
        localStorage.user_id = null;
        console.log("token after click:", localStorage.token)
        this.forceUpdate();

        dispatch({type: "LOGOUT_USER" });
    };


    navbarLinks() {
         //TODO Change into auth state passed from context
        if(localStorage.token !== '') {
            return [
                <li className="nav-item"><Link to="/account">MyAccount</Link></li>,
                <li className="nav-item"><button onClick={() => this.logout()}>logout</button></li>
            ];
            }
            return [
                <li className="nav-item"><Link to="/login">Login</Link></li>,
                <li className="nav-item"><Link to="/register">Register</Link></li>
            ];
        }

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
                                    {this.navbarLinks()}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </React.Fragment>
            )  
        };
    }




export default props => (
  <Consumer>
    {context => <Header {...props} context={context} />}
  </Consumer>
);
