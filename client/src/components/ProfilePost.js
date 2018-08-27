import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProfilePost extends Component {
    render() {
        const { post_id, username, votes, title, body, sub, file } = this.props.post;
        return (
            <div>
                <div className="card">
                    <div className="card" style={{ float: 'left'}}><strong>{votes}</strong></div>
                    <button type="button" className="btn btn-default btn-sm" onClick={() => this.onVote('UP')}>
                        <span className="glyphicon glyphicon-arrow-up"></span> Up
                    </button>
                    <button type="button" className="btn btn-default btn-sm" onClick={() => this.onVote('DOWN')}>
                        <span className="glyphicon glyphicon-arrow-down"></span> Down
                    </button>
                    <div style={{ float: 'right'}}>
                        <Link to={`/r/${sub}`}>/r/{sub}</Link>
                        <Link to={{ pathname: `/post/${post_id}`, state: { post_id, title, body, votes } }}>{title}</Link>
                    </div>
                </div>
            </div>
        )
    }
};
