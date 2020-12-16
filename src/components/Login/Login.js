import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

class Login extends Component {

    state = {
        login: "",
        password: "",
        error: false,
        logged: false
    }

    componentDidMount() {
        console.log(this.props.loggedUser);
        if (this.props.loggedUser) {
            console.log(this.props)
            this.setState({ logged: true });
        }
    }

    loginHandler = (event) => {
        event.preventDefault();
        var user = {
            login: this.state.login,
            password: this.state.password
        }
        if (!sessionStorage.getItem("user"))
            axios.post('/login', user).then(response => {
                if (response.data == 'NOT_FOUND') {
                    this.setState({ error: true });
                }
                else {
                    this.props.loginUserHandler(response.data);
                    this.setState({ logged: true });
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                }
            })
    }

    render() {
        if (!this.props.loggedUser)
            return (
                <div class="form-container">
                    <form>
                        <h3>Zaloguj się</h3><br />
                        <input placeholder="login" type="login" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} /><br />
                        <input placeholder="Hasło" type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} /><br />
                        {this.state.error ? <p id="error">Niepoprawne dane, spróbuj ponownie.</p> : ""}
                        {/* <button onClick = {() => this.props.loginHandler({username: this.state.login, password: this.state.password})}>Zaloguj</button> */}
                        <button class="form-btn" onClick={this.loginHandler}>Zaloguj</button>
                    </form>
                </div>
            );
        else
            return (
                <div class="form-container">
                    <p>Jesteś zalogowany jako {this.props.loggedUser.login}</p>
                    <NavLink to="/">Przejdź do strony głównej</NavLink>
                </div>
            )
    }
}

export default Login;