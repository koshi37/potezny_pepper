import React, { Component } from 'react';
import { Route, NavLink} from 'react-router-dom'

import PostList from './components/Posts/postList'
import Login from './components/Login/Login'
import AddOffer from './components/AddOffer/AddOffer';
import Register from './components/Register/Register';
import FullPost from './components/Posts/FullPost';
import CommentList from './components/Comment/CommentList';
import SubmitList from './components/Posts/SubmitList';
import AddComment from './components/Comment/AddComment';

class MainPage extends Component {

    state = {
        loggedUser: ""
    }

    componentDidMount() {
        if(!this.state.loggedUser)
        {
            const loggedInUser = JSON.parse(sessionStorage.getItem("user"));
            if (loggedInUser) {
                this.setState({loggedUser: loggedInUser});
            }
        }
    }

    logoutHandler = () => {
        this.setState({loggedUser: null});
        sessionStorage.clear();
    }

    loginUserHandler = (user) => {
        // var logged = this.state.users.find(u => u.username == user.username);
        // var logged = this.state.users.find((u) => {
        //     if(u.username === user.username && u.password === user.password)
        //     this.setState({loggedUser: u});
        //   });
        this.setState({loggedUser: user});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ul>
                        <li><NavLink to="/" exact>Home</NavLink></li>
                        {!this.state.loggedUser? <li><NavLink to="/login">Login</NavLink></li> : ""}
                        {!this.state.loggedUser? <li><NavLink to="/register">Rejestracja</NavLink></li> : ""}
                        {this.state.loggedUser? <li><NavLink to="/addoffer">Dodaj ofertę</NavLink></li> : ""}
                        {this.state.loggedUser && (this.state.loggedUser.role == "admin" || this.state.loggedUser.role == "mod") ? <li><NavLink to="/submitlist">Do zweryfikowania</NavLink></li> : ""}
                        {this.state.loggedUser? <li>Użytkownik: {this.state.loggedUser.login}</li> : ""}
                        {this.state.loggedUser? <a href="#" onClick={this.logoutHandler}>Wyloguj</a> : ""}
                    </ul>
                </header>
                <Route path="/" exact component={() => <PostList loggedUser={this.state.loggedUser}/>} />
                <Route path="/login" component={() => <Login loginUserHandler={this.loginUserHandler} loggedUser={this.state.loggedUser}/>} />
                <Route path="/register" component={Register} />
                <Route path="/addoffer" component={() => <AddOffer loggedUser={this.state.loggedUser}/>} />
                <Route path="/post" component={FullPost} />
                {/* <Route path="/post/:id" component={() => <AddComment loggedUser={this.state.loggedUser}/>} />
                <Route path="/post/:id" component={CommentList} /> */}
                <Route path="/submitlist" component={() => <SubmitList loggedUser={this.state.loggedUser}/>} />
            </div>
        );
    }
}

export default MainPage;