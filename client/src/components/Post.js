import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {

    onVote(type) {
        // TODO persist data to BACKEND ,INCREASE OR DECREASE VOTE AND SUBMIT QUERY
        const { id, title, body, sub, votes } = this.props.post;

        //TODO Payload should only include votes to avoid manipulation
        const post = {
            id,
            user_id: 1,
            title,
            body,
            sub,
            votes: this.getVotes(type, votes)
        };

        this.props.dispatch({ type: `VOTE_POST`, payload: post });
    }

    getVotes(type, votes) {
        switch(type) {
            case 'UP':
                return votes+=1;
            case 'DOWN':
                if (votes <= 0 ) {
                    return votes
                } else {
                    return votes-=1;
                }
            default:
                return votes;
        }
    };

    render() {
        const { post_id, votes, title, body } = this.props.post;
        return (
            <div className="card">
                <div className="card" style={{ float: 'left'}}><strong>{votes}</strong></div>
                <button type="button" className="btn btn-default btn-sm" onClick={() => this.onVote('UP')}>
                    <span className="glyphicon glyphicon-arrow-up"></span> Up
                </button>
                <button type="button" className="btn btn-default btn-sm" onClick={() => this.onVote('DOWN')}>
                    <span className="glyphicon glyphicon-arrow-down"></span> Down
                </button>
                <div style={{ float: 'right'}}>
                    <Link to={{ pathname: `/post/${post_id}`, state: { post_id, title, body, votes } }}>{title}</Link>
                </div>
            </div>
        )
    }
};

export default Post;