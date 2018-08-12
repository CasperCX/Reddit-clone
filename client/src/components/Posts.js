import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import { Consumer } from '../context';

class Posts extends Component {

    render() {
        return (
            <Consumer>
                {value => {
                    const { posts }  = value;
                    return (
                    <React.Fragment>
                        <Link to="/addpost">add post</Link>
                        {posts.map(post => 
                                <Post key={post.id} post={post} />
                        )}
                    </React.Fragment>
                    )
                }}
            </Consumer>
        )
    }
};


export default Posts;