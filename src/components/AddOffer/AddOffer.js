import React, { Component } from 'react';
import axios from 'axios';
import './AddOffer.css';

class AddOffer extends Component {

    state = {
        title: "",
        newPrice: undefined,
        oldPrice: undefined,
        link: "",
        pictureUrl: "",
        content: "",
        startDate: "",
        endDate: "",
        added: false
    }

    postDataHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            post: {
                title: this.state.title,
                content: this.state.content,
                link: this.state.link,
                pictureUrl: this.state.pictureUrl,
                oldPrice: this.state.oldPrice,
                newPrice: this.state.newPrice,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            }
        }
        console.log("data", data);
        axios.post("/postPost", data).then(response => {
            console.log(response);
            if (response.status == 200) {
                this.setState({ added: true });
            }
        });
    }

    render() {
        if (!this.state.added)
            return (
                <div class="form-container">
                    <h3>Dodaj nową okazję</h3><br />
                    <input id="title" type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} placeholder="Tytuł" /><br />
                    <input id="price" type="number" step="0.01" value={this.state.newPrice} onChange={(event) => this.setState({ newPrice: event.target.value })} placeholder="Nowa cena" /><br />
                    <input id="price" type="number" step="0.01" value={this.state.oldPrice} onChange={(event) => this.setState({ oldPrice: event.target.value })} placeholder="Stara cena" /><br />
                    <input id="link" type="text" value={this.state.pictureUrl} onChange={(event) => this.setState({ pictureUrl: event.target.value })} placeholder="Link do zdjęcia" /><br />
                    <input type="text" value={this.state.startDate} onChange={(event) => this.setState({ startDate: event.target.value })} placeholder="Data rozpoczęcia" /><br />
                    <input type="text" value={this.state.endDate} onChange={(event) => this.setState({ endDate: event.target.value })} placeholder="Data zakończenia" /><br />
                    <input id="link" type="text" value={this.state.link} onChange={(event) => this.setState({ link: event.target.value })} placeholder="Link do oferty" /><br />
                    <input id="content" type="text" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} placeholder="Opis" /><br />
                    <button class="form-btn" onClick={this.postDataHandler}>Dodaj</button>
                </div>
            );
        else
            return (
                <div>
                    Pomyślnie dodano post
                </div>
            );
    }
}

export default AddOffer;