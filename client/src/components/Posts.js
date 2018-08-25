import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Post from './Post';
import { Consumer } from '../context';
import  Toggle from './Toggle';

export class Posts extends Component {

    async componentWillMount() {
        const { dispatch } = this.props.context;
        const sub = this.props.match.params.sub;
        try {
            const posts = await axios.get(`/posts/${sub}`);
            //dispatch action to get all posts for current sub param
            dispatch({ type: 'GET_POSTS', payload: posts.data });
        } catch(err) {
            console.log(err);
        }
    };

    render() {
        const { posts, dispatch } = this.props.context;
        const { sub } = this.props.match.params;
        return (
            <React.Fragment>
                <Toggle> 
                {({ on, toggle }) => (
                    <div>
                       { on && <h1>Show me</h1> }
                        <button onClick={toggle}>Show hide</button>
                    </div>
                )}
                </Toggle>
                { this.props.match.params.sub  ? <h1>r/{this.props.match.params.sub}</h1>  : <h1>/all</h1> }
                <Link to={`/r/${sub}/addpost`}>add post</Link>
                {posts.map(post => 
                            <Post key={post.id} post={post} dispatch={dispatch}/>
                )}
            </React.Fragment>
        )
    }
};


export default React.forwardRef((props, ref) => (
    <Consumer>
      {context => <Posts {...props} context={context} ref={ref} />}
    </Consumer>
  ));