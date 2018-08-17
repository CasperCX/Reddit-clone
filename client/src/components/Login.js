import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../context';
import TextInputGroup from './layout/TextInputGroup';

class Login extends Component {
    state = {
        username: '',
        password: '',
        message: null

    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
            try {
                const res = await axios.post('/login', this.state);
                localStorage.setItem('jwt-token', res.data.token);
                
                dispatch({type: "LOGIN_USER", payload: this.state });
                this.setState({ username: '', password: '' });  //Clear state
                this.props.history.push('/');
            
            } catch(err) {
                this.setState({message: err.response.data.message});
                console.log(err.response.data.message);
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
                            <p style={{color:'red'}}>{this.state.message}</p>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        )
    }
};

export default Login;