import React, { Component } from 'react';
import AddComment from '../Comment/AddComment';
import CommentList from '../Comment/CommentList';

class FullPost extends Component {

    //tutaj nie będzie state, tylko metoda componentDidMount i wewnątrz z api bierzemy getById
    state = {
      post: null
      }

    componentDidMount() {
        var post = this.props.post;
        this.setState({post: post})
    }

    render() {
        //wartość przekazanego w link id
        console.log(this.props)
        
        if(this.props.post)
        return (
            <div>
                <div>
                    <p>Tytuł: {this.props.post.title}</p>
                    <button>+</button>
                    <button>-</button>
                    <p id="price">Cena: {this.props.post.price} </p><p id="oldprice">{this.props.post.oldprice}</p>
                    <br/>
                    <a href={this.props.post.link}>Link</a>
                </div>
                <div>
                    <CommentList loggedUser={this.props.loggedUser} post={this.props.post}/>
                </div>
            </div>
            
        );
        else
        return (
            <div>
                <p>Nie znaleziono posta</p>
            </div>
        )
    }
}

export default FullPost;