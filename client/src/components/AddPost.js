import React, { Component } from 'react';
import { Consumer } from '../context';
import axios from 'axios';

class AddPost extends Component {
    state = {
        title: '',
        body: '',
        selectedFile: null,
        message: null
    }

    fileSelected = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    };

    onFileUpload = async (file) => {
       console.log("trying to send", file)
        if (this.state.selectedFile !== null) {
            try {
                const formData = new FormData();
                formData.append("image", file);
                const uploadedFile = await axios.post('/uploadimage', formData);
                console.log("got back", uploadedFile)
                return uploadedFile.data.filePath;
            } catch(err) {
                console.log("erorr catched", err)
                this.setState({message: err.response.data.message});
            }
        } else {
            return null;
        }
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { title, body, selectedFile } = this.state;
        //TODO Get authenticated author id

        //Upload file
        const filePath = await this.onFileUpload(selectedFile);
        const post = {
            user_id: 1,
            title: title,
            body: body,
            file: filePath,
            sub: this.props.match.params.sub
        };

        try {
            await axios.post('/addpost', post);
            dispatch({ type: 'ADD_POST', payload: post }); //dispatch adding post action
            this.setState({ title: '', body: '' }); //Reset the input
            this.props.history.push(`/r/${this.props.match.params.sub}`);
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
                            <form onSubmit={this.onSubmit.bind(this, dispatch)} encType="multipart/form-data">
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
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input 
                                        name="image"
                                        type="file"
                                        className="form-control form-control-sm"
                                        onChange={this.fileSelected}
                                    />
                                </div>
                                <input type="submit" value="Add Post" className="btn btn-block"/>
                            </form>
                            <p style={{color:'red'}}>{this.state.message}</p>
                        </div>
                    </div>
                    )
                 }}
            </Consumer>
            )
        }
    };



export default AddPost;