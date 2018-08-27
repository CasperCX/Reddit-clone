import React, { Component } from 'react';
import { Consumer } from '../context';
import ProfilePost from './ProfilePost';
import axios from 'axios';

class Profile extends Component {
    async componentDidMount() {
        const user = this.props.match.params.username;
        const { dispatch } = this.props.context;
        try {
            const posts = await axios.get(`/posts/u/${user}`);
            dispatch({ type: 'GET_POSTS', payload: posts.data });;
        } catch(err) {
            dispatch({ type: 'ERROR', payload: `could not get posts for user ${user}` });
        }
    };


  render() {
    const { posts } = this.props.context;
    return (
      <div>
        User account page for { this.props.match.params.username }
        {posts.map(post => 
                    <ProfilePost key={post.id} post={post} />
                )}
      </div>
    )
  }
};

export default props => (
  <Consumer>
    {context => <Profile {...props} context={context} />}
  </Consumer>
  );
