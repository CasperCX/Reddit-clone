import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Post extends Component {

      async onVote(type) {
        //Clear the error messages
        this.props.dispatch({ type: 'ERROR', payload: null });
    
        // TODO Check if user is logged in else promp to login or register
        if (localStorage.token !== '') {
            const { id, title, body, sub, votes } = this.props.post;
            const calcvotes = this.getVotes(type, votes);
            //TODO Payload should only include votes to avoid manipulation
          const post = {
              id,
              user_id: localStorage.user_id,
              title,
              body,
              sub,
              votes: calcvotes
          };
  
        //TODO MAKE BACKEND HAVE A PROTECTED ROUTE
        console.log("calced votes", calcvotes)
          try {
              const res = await axios.put('/votepost', { post, calcvotes });
              this.props.dispatch({ type: `VOTE_POST`, payload: res });
          } catch (err) {
              console.log(err);
          };
        } else {
            //Show error message if user is not logged in
            this.props.dispatch({ type: 'ERROR', payload: 'You need to be logged in to vote' });
        }
    };

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
        const { post_id, username, votes, title, body, file } = this.props.post;
        return (
                <div className="post-wrapper">
                    <div className="vote-wrapper">
                        <button onClick={() => this.onVote('UP')}>
                            <i className="fa fa-arrow-up"></i>
                        </button>
                        <strong style={{float: 'left' }}>{votes}</strong>
                        <button onClick={() => this.onVote('DOWN')}>
                            <i className="fa fa-arrow-down"></i>
                        </button>
                    </div>
                    <div className="post-title">
                        <Link to={{ pathname: `/post/${post_id}`, state: { post_id, title, body, votes } }}>{title}</Link>
                    </div>
                    <div className="post-metadata">
                        posted by <Link to={`/u/${username}`}>/u/{username}</Link>
                       
                    </div>
                </div>
        )
    }
};

export default Post;