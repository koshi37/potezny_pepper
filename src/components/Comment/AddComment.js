import React, { Component } from 'react';
import axios from 'axios';

class AddComment extends Component {

    state = {
        text: ""
    }

    addCommentHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            content: this.state.text,
            postId: this.props.post.id
        }

        axios.post("/postComment", data).then(response => {
            if (response.data == "OK") {
                this.props.addCommentHandler(this.props.loggedUser.login, this.state.text);
            }
        });
    }

    render() {
        if (this.props.loggedUser)
            return (
                <div>
                    <input className="input-comment" placeholder="Treść komentarz" value={this.state.text} onChange={(event) => this.setState({ text: event.target.value })}></input>
                    <button class="form-btn" onClick={this.addCommentHandler}>Dodaj komentarz</button>
                </div>
            );
        else
            return (
                <div>
                    <p>Żeby dodać komentarz musisz się zalogować</p>
                </div>
            )
    }
}

export default AddComment;