import Axios from 'axios';
import React, { Component } from 'react';
import AdminPanelUser from './AdminPanelUser';
import './AdminPanel.css';

    
class AdminPanel extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        Axios.post("/getAllUsers").then(response => {
            console.log(response.data);
            this.setState({users: response.data});
        })
    }

    render() {
        var users = "";
        if(this.props.loggedUser && this.props.loggedUser.role == "admin" && this.state.users)
        {
            users = this.state.users.map( user => {
                return <AdminPanelUser user={user} loggedUser={this.props.loggedUser}/>
            });
                return (
                    <div className="AdminPanel">
                        {users}
                    </div>
                );
        }
        else if(this.props.loggedUser && this.props.loggedUser.role == "admin" && !this.state.users)
        {
            return (
                <div className="AdminPanel">
                    Nie udało się załadować użytkowników
                </div>
            );
        }
        else
        {
            return (
                <div className="AdminPanel">
                    <p>Nie masz uprawnień, zaloguj się jako admin.</p>
                </div>
            );
        }
    }
}

export default AdminPanel;