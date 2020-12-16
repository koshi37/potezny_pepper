import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';
import axios from 'axios';
import moment from 'moment';

class Post extends Component {

    state = {
        vote: 0,
        percent: 0
    }

    componentDidMount() {
        var vote = 0;
        if (this.props.post.userVotes)
            for (var i = 0; i < this.props.post.userVotes.length; i++) {
                vote += this.props.post.userVotes[i].vote;
            }
        this.setState({ vote: vote });

        if (this.props.post && this.props.post.newPrice && this.props.post.oldPrice) {
            var percent = 100 - (this.props.post.newPrice * 100) / this.props.post.oldPrice;
            percent = Math.floor(percent);
            this.setState({ percent: -percent });
        }
    }

    voteupHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            id: this.props.post.id,
            vote: 1
        }

        axios.post("/vote", data).then(response => {
            console.log(response);
            if (response.data != "BAD_REQUEST")
                this.setState({ vote: this.state.vote + 1 })
        });
    }

    votedownHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            id: this.props.post.id,
            vote: -1
        }

        axios.post("/vote", data).then(response => {
            console.log(response);
            if (response.data != "BAD_REQUEST")
                this.setState({ vote: this.state.vote - 1 })
        });
    }

    // var calcPercent {
    //     var percent = 100 - (this.props.post.newPrice*100)/this.props.post.oldPrice;
    //     console.log(percent)
    //     return percent;
    // }

    render() {
        return (
            <div className="Post">

                <NavLink to={{
                    pathname: '/post',
                    state: { post: this.props.post, loggedUser: this.props.loggedUser }
                }}>Tytuł: {this.props.post.title}</NavLink>
                { this.props.post.endDate && moment().isBefore(this.props.post.endDate) ? <h1 id="post-notstarted">Okazja aktualna</h1> :
                        this.props.post.endDate && moment().isAfter(this.props.post.endDate) ? <h1 id="post-ended">Okazja zakończona</h1> : <h1 id="post-noinfo">Brak daty zakończenia</h1>}
                <div class="user-actions">
                    {this.props.loggedUser ? <button onClick={this.voteupHandler}>+</button> : ""}
                    {this.props.loggedUser ? <button onClick={this.votedownHandler}>-</button> : ""}
                </div>
                <img src={this.props.post.pictureUrl}></img>


                <p>Ocena: {this.state.vote}</p>

                <br />
                <p id="price">Cena: {this.props.post.newPrice} </p><p id="oldprice">{this.props.post.oldPrice}</p>
                {this.state.percent < 0 ? <p id="lowpercent"> ({this.state.percent} %)</p> : <p id="highpercent"> (+ {this.state.percent} %)</p>}
            </div>
        );
    }
}

export default Post;