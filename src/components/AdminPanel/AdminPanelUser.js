import React, { Component } from 'react';
import axios from 'axios'

class AdminPanelUser extends Component {

    state = {
        role: "user",
        user: null,
        deleted: false
    }

    componentDidMount() {
        this.setState({user: this.props.user});
    }

    deleteUser = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            userToDelete: this.state.user.login
        }
        axios.post('/deleteUser', data);
        this.setState({deleted: true});
    }

    changeRoleHandler = () => {
        var data = {
            login: this.props.loggedUser.login,
            password: this.props.loggedUser.password,
            newRole: this.state.role,
            userNewRole: this.state.user.login
        }

        axios.post("/setRole", data);
        var user = this.state.user;
        user.role = this.state.role;
        this.setState({user: user});
    }

    render() {
        if(this.state.user)
        {
            if(!this.state.deleted)
            {
                return (
                    <div className="Post">
                        <p>Username: {this.state.user.login}</p>
                        <p>Email: {this.state.user.email}</p>
                        <p>Uprawnienia: {this.state.user.role}</p>
                        <select value={this.state.role} onChange={(event) => this.setState({role: event.target.value})}>
                            <option key='1' value='user'>Użytkownik</option>
                            <option key='2' value='mod'>Moderator</option>
                            <option key='3' value='admin'>Administrator</option>
                        </select>
                        <br/>
                        <button style={{float: 'left'}} onClick={this.changeRoleHandler}>Zmień uprawnienia</button>
                        <br/>
                        <button onClick={this.deleteUser}>Usuń użytkownika</button>
                    </div>
                );
            }
            else
            {
                return (
                    <div className="Post">
                        <p style={{fontSize: '20px', color: 'red'}}>Usunięto użytkownika</p>
                    </div>
                );
            }
        }
        else
        {
            return (
                <div className="Post">
                    <p>Nie znaleziono użytkownika</p>
                </div>
            );
        }
    }
}

export default AdminPanelUser;