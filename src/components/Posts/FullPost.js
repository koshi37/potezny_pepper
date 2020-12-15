import React, { Component } from 'react';
import AddComment from '../Comment/AddComment';
import CommentList from '../Comment/CommentList';
import axios from 'axios';
import './FullPost';
import moment from 'moment';
import localization from 'moment/locale/pl';

class FullPost extends Component {

    //tutaj nie będzie state, tylko metoda componentDidMount i wewnątrz z api bierzemy getById
    state = {
        post: null,
        loggedUser: null,
        vote: 0,
        percent: 0
    }

    componentDidMount() {
        if (this.props.location.state.post)
            this.setState({ post: this.props.location.state.post });
        if (this.props.location.state.loggedUser)
            this.setState({ loggedUser: this.props.location.state.loggedUser });

        var vote = 0;
        if (this.props.location.state.post.userVotes)
            for (var i = 0; i < this.props.location.state.post.userVotes.length; i++) {
                vote += this.props.location.state.post.userVotes[i].vote;
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
            login: this.state.loggedUser.login,
            password: this.state.loggedUser.password,
            id: this.state.post.id,
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
            login: this.state.loggedUser.login,
            password: this.state.loggedUser.password,
            id: this.state.post.id,
            vote: -1
        }

        axios.post("/vote", data).then(response => {
            console.log(response);
            if (response.data != "BAD_REQUEST")
                this.setState({ vote: this.state.vote - 1 })
        });
    }

    render() {
        moment.updateLocale('pl', localization);
        if (this.state.post)
            return (
                <div class="full-post-container">
                    <div>
                        <h1>Tytuł: {this.state.post.title}</h1>
                        <a href={this.state.post.link}><h4>--LINK DO OFERTY--</h4></a>
                        <div><img class="img-container" src={this.state.post.pictureUrl} /></div>

                        <div class="all-info-container">
                            <div class="date-info">                        <p>Początek: {moment(this.state.post.endDate).format('LL')}</p>
                                <p>Koniec: {moment(this.state.post.startDate).format('LL')}</p></div>
                            <div class="fullpost-user-actions">
                                {this.state.loggedUser ? <button onClick={this.voteupHandler}>+</button> : ""}
                                {this.state.loggedUser ? <button onClick={this.votedownHandler}>-</button> : ""}
                                <h2>Ocena: {this.state.vote}</h2>

                            </div>


                            <div class="price-info">                        <h3 id="price">Cena: {this.state.post.newPrice} </h3><p id="oldprice">{this.state.post.oldPrice}</p>
                                {this.state.percent < 0 ? <p id="fullpost-lowpercent"> ({this.state.percent} %)</p> : <p id="fullpost-highpercent"> (+ {this.state.percent} %)</p>}</div>


                        </div>
                        <br />


                    </div>
                    <div class="comments-container">
                        <CommentList loggedUser={this.state.loggedUser} post={this.state.post} />
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