import React, { Component } from 'react';

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


export class Provider extends Component {
    state = {
        posts: [
            {
                id: 1,
                title: "title one",
                body: "body one"
            }, 
            {
                id: 2,
                title: "title two",
                body: "body two"
            },
            {
                id: 3,
                title: "title three",
                body: "body three"
            }
        ],
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