import React, { Component } from 'react';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Register extends Component {
    state = {
        login: "",
        password: "",
        email: "",
        error: false,
        registered: false
    }

    registerHandler = () => {

        var user = {
            login: this.state.login,
            password: this.state.password,
            email: this.state.email
        }

        axios.post('/register', user).then(response => {
            if (response.data == "BAD_REQUEST") {
                this.setState({ error: true });
            }
            else {
                this.setState({ registered: true });
            }
        })
    }

    render() {
        if (!this.state.registered)
            return (
                <div class="form-container">
                    {/* <p>State: {this.state.login} {this.state.password} {this.state.age}</p> */}
                    <h3>Utwórz nowe konto</h3><br />
                    <input placeholder="login" type="login" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} /><br />
                    <input placeholder="hasło" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} /><br />
                    <input placeholder="email" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} /><br />
                    {this.state.error ? <p id="error">Login zajęty, spróbuj ponownie.</p> : ""}
                    <button class="form-btn" onClick={this.registerHandler}>Zarejestruj</button>
                </div>
            );
        else
            return (
                <div>
                    <p>Zarejestrowano pomyślnie, możesz się zalogować</p>
                    <li><NavLink to="/login">Logowanie</NavLink></li>
                </div>
            );
    }
}

export default Register;