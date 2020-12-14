import React, { Component } from 'react';

import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Register extends Component {
    state = {
        login: "",
        password: "",
        age: "",
        error: false,
        registered: false
    }

    registerHandler = () => {
        
        var user = {
            login: this.state.login,
            password: this.state.password,
            age: this.state.age
        }

        axios.post('/register', user).then(response => {
            if(response.data == "BAD_REQUEST")
            {
                this.setState({error: true});
            }
            else
            {
                this.setState({registered: true});
            }
        })
    }

    render() {
        if(!this.state.registered)
        return (
            <div>
                <p>State: {this.state.login} {this.state.password} {this.state.age}</p>
                <h3>Utwórz nowe konto</h3><br/>
                <label>Login</label>
                <input type="login" value={this.state.login} onChange={(event) => this.setState({login: event.target.value})} /><br/>
                <label>Hasło</label>
                <input type="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} /><br/>
                <label>Wiek</label>
                <input type="number" value={this.state.age} onChange={(event) => this.setState({age: event.target.value})} /><br/>
                {this.state.error? <p id="error">Login zajęty, spróbuj ponownie.</p>:""}
                <button onClick = {this.registerHandler}>Zarejestruj</button>
            </div>
        );
        else
        return(
            <div>
                <p>Zarejestrowano pomyślnie, możesz się zalogować</p>
                <li><NavLink to="/login">Logowanie</NavLink></li>
            </div>
        );
    }
}

export default Register;