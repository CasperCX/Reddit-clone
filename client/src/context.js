import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
};

//TODO fetch all data from cloud
export class Provider extends Component {
    state = {
        posts: [],
        dispatch: action => this.setState(state => reducer(state, action))
    };

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/posts');
        this.setState({ posts: [...res.data]});
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;