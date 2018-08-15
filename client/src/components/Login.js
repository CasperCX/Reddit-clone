import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../context';
import TextInputGroup from './layout/TextInputGroup';

class Login extends Component {
    state = {
        username: '',
        password: ''

    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        try {
            const token = await axios.post('/gettoken', this.state);
            localStorage.setItem('jwt-token', token.data);
            console.log("created token for: ", this.state)
            console.log("token: ", token.data);

            dispatch({type: "LOGIN_USER", payload: this.state });
            this.setState({ username: '', password: '' });  //Clear state

            //TODO if auth fails return to login else return to posts
            this.props.history.push('/');
        } catch (err) {
            console.log(err);
        }
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { username, password } = this.props;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <React.Fragment>
                            <h1>Login</h1>
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                            <TextInputGroup 
                                type="text"
                                label="Username"
                                name="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={this.onChange} 
                            />
                            <TextInputGroup 
                                type="password"
                                label="Password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={this.onChange} 
                            />
                            <input
                                type="submit"
                                value="login"
                                className=" btn btn-light btn-block"
                            />
                            </form>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )
    }
};

export default Login;