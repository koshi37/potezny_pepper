import React, { Component } from 'react';
import Post from './Post'

import axios from 'axios';

import './PostList.css'

class postList extends Component {

    state = {
        posts: []
      }

    componentDidMount() {
        axios.post("/getAcceptedPosts").then(response => {
            console.log(response.data);
            this.setState({posts: response.data});
        });
    }

    render() {
        var posts = this.state.posts.map(post => <Post loggedUser={this.props.loggedUser} post={post}/>);
        console.log(this.state.posts)
        return (
            <div className="PostList">
                {posts}
            </div>
        );
    }
}

export default postList;