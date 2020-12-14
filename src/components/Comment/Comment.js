import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Comment.css';

class Comment extends Component {
    render() {
        return (
            <div className="Comment">
                <p id="user">{this.props.comment.login}</p>
                <br/>
                <p id="price">{this.props.comment.content}</p>
            </div>
        );
    }
}

export default Comment;