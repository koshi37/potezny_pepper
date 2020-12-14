import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Comment.css';

class Comment extends Component {
    render() {
        return (
            <div className="Comment">
                <p id="user">{this.props.comment.username}</p>
                <br/>
                <p id="price">{this.props.comment.text}</p>
            </div>
        );
    }
}

export default Comment;