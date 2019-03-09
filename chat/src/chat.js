import React, { Component } from 'react';

class Chat extends Component{    
    createLi(item){

        
        if(item.username === this.props.username){
            console.log(item.username);
            console.log(this.props.username);
            return(
            <li className="chat__main__list__item--userMessage" key={item.id}>
                <div className="chat__main__list__item__container--userMessage">
                    <p className="chat__main__list__item__container__username" >{item.username}</p>
                    <p className="chat__main__list__item__container__content">{item.content}</p>
                </div>
            </li>
            )
        }else{
            return(
                <li className="chat__main__list__item" key={item.id}>
                    <div className="chat__main__list__item__container">
                        <p className="chat__main__list__item__container__username" >{item.username}</p>
                        <p className="chat__main__list__item__container__content">{item.content}</p>
                    </div>
                </li>
            )
        }
    }

    render(){
        return(
            <div className="chat">
                <header className="chat__header"></header>
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