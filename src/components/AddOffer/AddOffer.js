import React, { Component } from 'react';

class AddOffer extends Component {

    state = {
        title: "",
        price: 0,
        oldprice: 0,
        link: ""
    }

    postDataHandler = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h3>Dodaj nową okazję</h3><br/>
                <label>Tutył</label>
                <input id="title" type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} /><br/>
                <label>Cena</label>
                <input id="price" type="number" step="0.01" value={this.state.price} onChange={(event) => this.setState({price: event.target.value})} /><br/>
                <label>Stara cena</label>
                <input id="price" type="number" step="0.01" value={this.state.oldprice} onChange={(event) => this.setState({oldprice: event.target.value})} /><br/>
                <label>Link</label>
                <input id="link" type="text" value={this.state.link} onChange={(event) => this.setState({link: event.target.value})} /><br/>
                <button style={{float: 'left'}} onClick = {this.postDataHandler}>Dodaj</button>
            </div>
        );
    }
}

export default AddOffer;