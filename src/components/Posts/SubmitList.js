import React, { Component } from 'react';
import SubmitPost from './SubmitPost';
import axios from 'axios';

class SubmitList extends Component {
    state = {
        posts: []
      }

    componentDidMount() {
    if(this.props.loggedUser)
    {
        var user = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
        }
        axios.post("/getNotAcceptedPosts", user).then(response => {
            this.setState({posts: response.data});
        });
    }
    }

    deleteHandler = (id) => {
        if(this.state.posts)
        {
            const newPosts = this.state.posts.filter(post => post.id !== id)
            this.setState({posts: newPosts})
        }
    }

    render() {
        var posts = <p>Nie masz odpowiednich uprawnień</p>;
        if(this.props.loggedUser && (this.props.loggedUser.role == "admin" || this.props.loggedUser.role == "mod"))
        {
            if(this.state.posts)
            {
                posts = this.state.posts.map(post => {
                    return <SubmitPost loggedUser={this.props.loggedUser} post={post} deleteHandler={this.deleteHandler} />
                });
            }
            else
            {
                posts = <p>Brak postów to zaakceptowania.</p>
            }
        }
        return (
            <div className="PostList">
                {posts}
            </div>
        );
    }
}

export default SubmitList;