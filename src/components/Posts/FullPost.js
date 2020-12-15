import React, { Component } from 'react';
import AddComment from '../Comment/AddComment';
import CommentList from '../Comment/CommentList';
import axios from 'axios';
import './FullPost';

class FullPost extends Component {

    //tutaj nie będzie state, tylko metoda componentDidMount i wewnątrz z api bierzemy getById
    state = {
      post: null,
      loggedUser: null,
      vote: 0,
      percent: 0
      }

    componentDidMount() {
        if(this.props.location.state.post)
        this.setState({post: this.props.location.state.post});
        if(this.props.location.state.loggedUser)
        this.setState({loggedUser: this.props.location.state.loggedUser});

        var vote = 0;
        if(this.props.location.state.post.userVotes)
        for(var i = 0; i < this.props.location.state.post.userVotes.length; i++)
        {
            vote += this.props.location.state.post.userVotes[i].vote;
        }
        this.setState({vote: vote});

        var percent = 100 - (this.props.post.newPrice*100)/this.props.post.oldPrice;
        percent = Math.floor(percent);
        this.setState({percent: -percent});
    }

    voteupHandler = () => {
        var data = {
            login: this.state.loggedUser.login,
            password: this.state.loggedUser.password,
            id: this.state.post.id,
            vote: 1
        }

        axios.post("/vote", data).then(response => {
            console.log(response);
            if(response.data != "BAD_REQUEST")
            this.setState({vote: this.state.vote + 1})
        });
    }

    votedownHandler = () => {
        var data = {
            login: this.state.loggedUser.login,
            password: this.state.loggedUser.password,
            id: this.state.post.id,
            vote: -1
        }

        axios.post("/vote", data).then(response => {
            console.log(response);
            if(response.data != "BAD_REQUEST")
            this.setState({vote: this.state.vote - 1})
        });
    }

    render() {
        
        if(this.state.post)
        return (
            <div>
                <div>
                    <p>Tytuł: {this.state.post.title}</p>
                    <img src={this.state.post.pictureUrl}/>
                    {this.state.loggedUser ? <button onClick={this.voteupHandler}>+</button>:""}
                    {this.state.loggedUser ? <button onClick={this.votedownHandler}>-</button>:""}
                    <p>Ocena: {this.state.vote}</p>
                    <p id="price">Cena: {this.state.post.newPrice} </p><p id="oldprice">{this.state.post.oldPrice}</p>
                    {this.state.percent < 0 ? <p id="lowpercent"> ({this.state.percent} %)</p>:<p id="highpercent"> (+ {this.state.percent} %)</p>}
                    <p>{this.state.post.date}</p>
                    <br/>
                    <a href={this.state.post.link}>Link</a>
                </div>
                <div>
                    <CommentList loggedUser={this.state.loggedUser} post={this.state.post}/>
                </div>
            </div>
            
        );
        else
        return (
            <div>
                <p>Nie znaleziono posta</p>
            </div>
        )
    }
}

export default FullPost;