import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';
import axios from 'axios';

class SubmitPost extends Component {

    state = {
        accepted: false,
        deleted: false
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
        else
        return (
            <div className="Post">
                <NavLink to={'/post/' + this.props.post.id}>Tytuł: {this.props.post.title}</NavLink>
                <img src={this.props.post.pictureUrl}></img>
                <p id="price">Cena: {this.props.post.newPrice} </p><p id="oldprice">{this.props.post.oldPrice}</p>
                <p>Opis:</p>
                <p>{this.props.post.content}</p>
                <button onClick={this.acceptHandler}>Zaakceptuj</button>
                <button onClick={this.deleteHandler}>Usuń</button>
                <br/>
            </div>
        );
    }
}

export default SubmitPost;