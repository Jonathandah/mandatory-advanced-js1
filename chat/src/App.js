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
      inputError: "",
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
    let usernameRegex = /^[a-zA-Z0-9\s-_]+$/;
    if(usernameRegex.test(this.state.username) && this.state.username.length !==0){
      console.log("regex funkar");
      this.state.login === true ? this.setState({login:false}) : this.setState({login:true});
      console.log(this.state.login);
      this.setState({
        inputError: "",
      })
    }else{
      this.setState({inputError: "Ditt användarnamn får endast innehålla 1-12 alfanumerisk tecken, \"_\", \"-\" och mellanslag."})
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
    if(this.state.message.length===0){
      this.setState({
        inputError: "Du måste skicka minst ett tecken och får heller inte överskrida 200",
      })
    }else{
      socket.emit("message", {
        username: this.state.username,
        content: this.state.message,
      }, (response) => {
          this.setState({ messages: [...this.state.messages, response.data.newMessage], inputError: ""});
          console.log(response);
      });
      this.setState({message: ""});
    }
  }
  render() {
    return (
      <div className="app">
        {this.state.login === true ? 
          <Login
            onChangeUsername={this.onChangeUsername} 
            username={this.state.username} 
            onLogin={this.onLogin} 
            inputError={this.state.inputError} /> 
          
            : 
        
          <Chat 
            onChangeMessage={this.onChangeMessage} 
            message={this.state.message} 
            messages={this.state.messages} 
            onSend={this.onSend} 
            username={this.state.username} 
            onLogin={this.onLogin} 
            inputError={this.state.inputError} /> 
        }
      </div>
    );
  }
}

export default App;
