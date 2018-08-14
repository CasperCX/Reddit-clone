import React, { Component } from 'react';
import axios from 'axios';

class PostView extends Component {
    state = {
        id_test: null,
        comments: []    
    };

    async componentDidMount() {
        //Fetch  the comments for this post
        const { id } = this.props.location.state;
        try {
            const post = await axios.get(`http://localhost:5000/post/${id}`);
            this.setState({ id_test: post.data.id});
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { title, body } = this.props.location.state;
        return (
            <div>
                <h1>title: {title}</h1> 
                <p>{body}</p>
            </div>
        )
    }
};

export default PostView;

// export default (props) => {
//     const { title, body } = props.location.state;
//     return (
//         <div>
//             <h1>{title}</h1> 
//              <p>{body}</p>
//         </div>
//     )

//     //TODO make a class and fetch the comments on enter
// };
