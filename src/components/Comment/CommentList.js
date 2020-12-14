import React, { Component } from 'react';
import Comment from './Comment'
import axios from 'axios';

import './Comment.css'
import AddComment from './AddComment';

class CommentList extends Component {

    state = {
        comments: []
    }

    componentDidMount() {
        if(this.props.post && this.props.post.comments)
        this.setState({comments: this.props.post.comments});
    }
    // this.props.match.params.id

    render() {
        var comments = this.state.comments.map(comment => <Comment comment={comment}/>);
        return (
            <div className="CommentList">
                {this.props.loggedUser? <AddComment loggedUser={this.props.loggedUser} post={this.props.post}/>:""}
                <p>Komentarze:</p>
                {comments}
            </div>
        );
    }
}

export default CommentList;