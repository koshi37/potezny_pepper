import React, { Component } from 'react';
import axios from 'axios';

class AddOffer extends Component {

    state = {
        title: "",
        newPrice: 0,
        oldPrice: 0,
        link: "",
        pictureUrl: "",
        content: "",
        startDate: "",
        endDate: "",
        added: false
    }

    postDataHandler = () => {
        var data ={
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
        console.log("data",data);
        axios.post("/postPost", data).then(response => {
            console.log(response);
            if(response.status == 200)
            {
                this.setState({added: true});
            }
        });
    }

    render() {
        if(!this.state.added)
        return (
            <div>
                <h3>Dodaj nową okazję</h3><br/>
                <label>Tutył</label>
                <input id="title" type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} /><br/>
                <label>Cena</label>
                <input id="price" type="number" step="0.01" value={this.state.newPrice} onChange={(event) => this.setState({newPrice: event.target.value})} /><br/>
                <label>Stara cena</label>
                <input id="price" type="number" step="0.01" value={this.state.oldPrice} onChange={(event) => this.setState({oldPrice: event.target.value})} /><br/>
                <label>Link do zdjęcia</label>
                <input id="link" type="text" value={this.state.pictureUrl} onChange={(event) => this.setState({pictureUrl: event.target.value})} /><br/>
                <label>Data rozpoczecia</label>
                <input type="text" value={this.state.startDate} onChange={(event) => this.setState({startDate: event.target.value})} /><br/>
                <label>Data Zakończenia</label>
                <input type="text" value={this.state.endDate} onChange={(event) => this.setState({endDate: event.target.value})} /><br/>
                <label>Link do oferty</label>
                <input id="link" type="text" value={this.state.link} onChange={(event) => this.setState({link: event.target.value})} /><br/>
                <label>Opis</label>
                <input id="content" type="text" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} /><br/>
                <button style={{float: 'left'}} onClick = {this.postDataHandler}>Dodaj</button>
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