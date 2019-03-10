import React, { Component } from 'react';
import Emoji from 'react-emoji-render';
import Linkify from "react-linkify";

class Chat extends Component{
    createLi(item){
        if(item.username === this.props.username){
            console.log(item.content);
            return(
            <li className="chat__main__list__item--userMessage" key={item.id}>
                <div className="chat__main__list__item__container--userMessage">
                    <p className="chat__main__list__item__container__username" >{item.username}</p>
                    <p className="chat__main__list__item__container__content">
                        <Linkify>
                            <Emoji text={item.content}/>
                        </Linkify>
                    </p>
                </div>
            </li>
            )
        }else{
            return(
                <li className="chat__main__list__item" key={item.id}>
                    <div className="chat__main__list__item__container">
                        <p className="chat__main__list__item__container__username" >{item.username}</p>
                        <p className="chat__main__list__item__container__content">
                        <Linkify>
                            <Emoji text={item.content}/>
                        </Linkify>
                        </p>
                    </div>
                </li>
            )
        }
    }

    render(){
        console.log(this.props.messages);
        return(
            <div className="chat">
                <header className="chat__header">
                    <button className="chat__header__signout" onClick={this.props.onLogin}>Signout</button>
                </header>
                <main className="chat__main">
                    <ul className="chat__main__list">
                        {this.props.messages.map(item => this.createLi(item))}
                    </ul>
                </main>
                <div className = "chat__inputfield">
                    <input className="chat__inputfield__input" type="text" value={this.props.message} onChange={this.props.onChangeMessage}></input>
                    <button className="chat__inputfield__sendButton" onClick={this.props.onSend}>Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;