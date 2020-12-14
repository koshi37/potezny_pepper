import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';

class Post extends Component {
    
    state = {
        vote: this.props.post.vote
    }

    componentDidMount() {
        var vote = 0;
        if(this.props.post.userVotes)
        this.props.post.userVotes.map(v => {
            console.log(v);
        });
    }

    render() {
        return (
            <div className="Post">
                <NavLink to={'/post/' + this.props.post.id}>Tytuł: {this.props.post.title}</NavLink>
                <img src={this.props.post.pictureUrl}></img>
                <button onClick={() => this.setState({vote: this.state.vote + 1})}>+</button>
                <button onClick={() => this.setState({vote: this.state.vote - 1})}>-</button>
                <p>Ocena:</p>
                <br/>
                <p id="price">Cena: {this.props.post.newPrice} </p><p id="oldprice">{this.props.post.oldPrice}</p>
            </div>
        );
    }
}

export default Post;