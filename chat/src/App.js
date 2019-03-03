import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

socket.on('connect', function(){
  console.log("connected");
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: [],
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

    socket.on("messages", (messages) => {
      this.setState({ messages: messages });
    });

    socket.on("new_message", (message) => {
      console.log("new message körs");
      this.setState({ messages: [...this.state.messages, message]});
    });
  }

  createLi(item){
    console.log(item);
    return(
      <li className="chat__main__list__item" key={item.id}>
      <div className="chat__main__list__item__container">
        <p className="chat__main__list__item__container__username" >{item.username}</p>
        <p className="chat__main__list__item__container__content">{item.content}</p>
      </div>
      </li>
    )
  }

  onChange(e){
    this.setState({message: e.target.value});
  }

  onClick(e){
    console.log("onclick körs");

    socket.emit("message", {
      username: "jonathan",
      content: this.state.message,
    }, (response) => {
        this.setState({ messages: [...this.state.messages, response.data.newMessage]});
      console.log(response);
    });

    this.setState({message: ""});

  }

  render() {
    return (
      <div className="chat">
        <header className="chat__header"></header>
        <main className="chat__main">
          <ul className="chat__main__list">
            {this.state.messages.map(item => this.createLi(item))}
          </ul>
        </main>
        <div className = "chat__inputfield">
          <input className="chat__inputfield__input" type="text" value={this.state.message} onChange={this.onChange}></input>
          <button className="chat__inputfield__sendButton" onClick={this.onClick}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
