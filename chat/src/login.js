import React, { Component } from 'react';

class Login extends Component{
    render(){
        return(
            <div className="login">
                <header className="login__header">
                    <p className="login__header__text">Login</p>
                </header>
                <main className="login__main">
                    <input type="text" className="login__main__input" name="username" value={this.props.username} onChange={this.props.onChangeUsername}></input>
                    <label  className="login__main__label">Username</label>
                    <button className="login__main__loginButton" onClick={this.props.onLogin}>Login</button>
                </main>
            </div> 
        );
    }
}

export default Login;