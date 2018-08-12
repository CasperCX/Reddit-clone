import React, { Component } from 'react';

const Context = React.createContext();

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
        ]
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