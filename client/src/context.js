import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'GET_POSTS':
        console.log("getting posts for sub", action.payload);
            return {
                ...state, posts: [...action.payload]
            }
        case 'ADD_POST':
        console.log('adding post', action.payload);
            return {
                ...state, posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
        console.log('deleting post', action.payload);
            return {
                ...state, posts: state.posts.filter(post => 
                post.id !== action.payload)
            }
        case 'VOTE_POST':
            return {
                posts: [state.posts[action.payload.id] = action.payload]
            }
        case 'LOGIN_USER':
        console.log('loggin in user', action.payload);
            return {
                ...state, user_id: action.payload.user_id, username: action.payload.username, authenticated: true
            }
        case 'LOGOUT_USER':
        console.log('loggin out user',);
            return {
                ...state, user_id: null, username: null, authenticated: false
            }
        case 'REGISTER_USER':
        console.log('registering user', action.payload);
            return {
                ...state, username: action.payload
            }
        case 'AUTHENTICATED':
        console.log('user is authenticated');
            return {
                ...state, authenticated: true
            }
        case 'ERROR':
            return {
                ...state, error: action.payload
            }
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        user_id: null,
        username: null,
        authenticated: false,
        error: null,
        posts: [],
        dispatch: action => this.setState(state => reducer(state, action))
    };

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;