import React, { Component } from 'react';
import axios from 'axios';

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
                ...state, user: action.payload.username
            }
        case 'REGISTER_USER':
        console.log('registering user', action.payload);
            return {
                ...state, user: action.payload.username
            }
        default:
            return state;
    }
};

export class Provider extends Component {
    state = {
        user: null,
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