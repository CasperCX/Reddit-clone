import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
    render() {
        const { id, title, body } = this.props.post;

        return (
            <div className="card">
                <Link to={{ pathname: `/post/${id}`, state: { id, title, body } }}>{title}</Link>
            </div>
        )
    }
};

export default Post;