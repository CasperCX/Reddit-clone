import React, { Component } from 'react';
import { Consumer } from '../context';
import axios from 'axios';

class AddPost extends Component {
    state = {
        title: '',
        body: ''
    }


    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { title, body } = this.state;
        //TODO Get authenticated author id
       
        const post = {
            user_id: 1,
            title: title,
            body: body,
            sub: this.props.match.params.sub
        };

        try {
            await axios.post('/addpost', post);
            dispatch({ type: 'ADD_POST', payload: post }); //dispatch adding post action
            this.setState({ title: '', body: '' }); //Reset the input
            this.props.history.push('/');
        } catch(err) {
            console.log(err);
            return;
        }
    };

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    render() {
        const { title, body } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card mb-3">
                        <div className="card-header">Add Post</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <div className="form-group">
                                    <label htmlFor="title">title</label>
                                    <input 
                                        name="title"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Title"
                                        value={title}
                                        onChange={this.onChangeInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">body</label>
                                    <input 
                                        name="body"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Body"
                                        value={body}
                                        onChange={this.onChangeInput}
                                    />
                                </div>
                                <input type="submit" value="Add Post" className="btn btn-block"/>
                            </form>
                        </div>
                    </div>
                    )
                 }}
            </Consumer>
            )
        }
    };



export default AddPost;