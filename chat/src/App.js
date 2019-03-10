import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import Login from './login';
import Chat from "./chat";

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
      login: true,
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onSend = this.onSend.bind(this);
  }
  onChangeUsername(e){
    this.setState({
      username: e.target.value,
    })
  }

  onLogin(){
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    if(usernameRegex.test(this.state.username)){
      console.log("regex funkar");
      this.state.login === true ? this.setState({login:false}) : this.setState({login:true});
      console.log(this.state.login);
    }else{
      console.log("username får inte ha åäö");
    }
  }

  componentDidMount() {
    //socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

    socket.on("messages", (messages) => {
      this.setState({ messages: messages });
    });

    socket.on("new_message", (message) => {
      console.log("new message körs");
      this.setState({ messages: [...this.state.messages, message]});
    });
  }
  onChangeMessage(e){
    this.setState({
      message: e.target.value,
    })
  }

  onSend(e){
    console.log(this.state.message);
    socket.emit("message", {
      username: this.state.username,
      content: this.state.message,
    }, (response) => {
        this.setState({ messages: [...this.state.messages, response.data.newMessage]});
        console.log(response);
    });

    this.setState({message: ""});

  }
  render() {
    return (
      <div className="app">
        {this.state.login === true ? <Login onChangeUsername={this.onChangeUsername} username={this.state.username} onLogin={this.onLogin} /> : <Chat onChangeMessage={this.onChangeMessage} message={this.state.message} messages={this.state.messages} onSend={this.onSend} username={this.state.username} onLogin={this.onLogin} /> }
      </div>
    );
  }
}

export default App;
