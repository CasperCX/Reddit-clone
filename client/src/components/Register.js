import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../context';
import TextInputGroup from './layout/TextInputGroup';


class Register extends Component {
    state = {
        username: '',
        password: ''
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/register', this.state);
            console.log("client response", res)
            //TODO check if res is a new user or a error
            dispatch({type: "REGISTER_USER", payload: this.state });
            this.setState({ username: '', password: '' });  //Clear state

            //TODO if auth fails return to register else return to posts
            this.props.history.push('/login');
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
                            <h1>Register</h1>
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
                                value="register"
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

export default Register;

