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
            if(res.status === 200) {
                dispatch({type: "REGISTER_USER", payload: this.state });
                 //Clear state
                this.setState({ username: '', password: '' }); 
                //redirect to login after succesfully registered
                this.props.history.push('/login');
            } else {
                //TODO push with error message
                this.props.history.push('/register');
            }

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

