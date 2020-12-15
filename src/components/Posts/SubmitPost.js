import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';
import axios from 'axios';
import moment from 'moment';
import localization from 'moment/locale/pl';

class SubmitPost extends Component {

    state = {
        accepted: false,
        deleted: false,
        percent: 0
    }

    componentDidMount() {
        moment.updateLocale('pl', localization);
        if(this.props.post && this.props.post.newPrice && this.props.post.oldPrice)
        {
            var percent = 100 - (this.props.post.newPrice*100)/this.props.post.oldPrice;
            percent = Math.floor(percent);
            this.setState({percent: -percent});
        }
    }

    acceptHandler = () => {
        var data = {
                login: this.props.loggedUser.login,
                password: this.props.loggedUser.password,
                id: this.props.post.id
        }
        axios.post("/acceptPost", data).then(response => {
            console.log(response.data == "OK");
            if(response.data == "OK")
            {
                this.setState({accepted: true})
            }
        })
    }

    deleteHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            id: this.props.post.id
        }
        axios.post("/deletePost", data).then(response => {
            console.log(response);
            if(response.data == "OK")
            {
                this.setState({deleted: true})
            }
        })
    }

    render() {
        if(this.state.deleted)
        return (
            <div className="Post">
                <p>Post został usunięty</p>
            </div>
        )
        else if(this.state.accepted)
        return (
            <div className="Post">
                <p>Post został dodany</p>
            </div>
        )
        else if(this.props.post)
        return (
            <div className="Post">
                <NavLink to={{
                    pathname: '/post',
                    state: {post: this.props.post, loggedUser: this.props.loggedUser}
                }}>Tytuł: {this.props.post.title}</NavLink>
                <img src={this.props.post.pictureUrl}></img>
                <p id="price">Cena: {this.props.post.newPrice} </p><p id="oldprice">{this.props.post.oldPrice}</p>
                {this.state.percent < 0 ? <p id="lowpercent"> ({this.state.percent} %)</p>:<p id="highpercent"> (+ {this.state.percent} %)</p>}
                <p>Opis:</p>
                <p>{this.props.post.content}</p>
                <p>Początek: {moment(this.props.post.endDate).format('LL')}</p>
                <p>Koniec: {moment(this.props.post.startDate).format('LL')}</p>
                <button onClick={this.acceptHandler}>Zaakceptuj</button>
                <button onClick={this.deleteHandler}>Usuń</button>
                <br/>
            </div>
        );
    }
}

export default SubmitPost;