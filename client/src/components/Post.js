import React, { Component } from 'react';

class Post extends Component {
    render() {
        const { title, body } = this.props.post;

        return (
            <div>
                <h4>{title}</h4>
                <strong>{body}</strong>
            </div>
        )
    }
};

export default Post;