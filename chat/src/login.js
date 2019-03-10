import React, { Component } from 'react';
import "./login.css";
class Login extends Component{
    render(){
        return(
            <div className="login">
                <div className="login__container">
                    <header className="login__container__header">
                        <p className="login__container__header__text">Login</p>
                    </header>
                    <main className="login__container__main">
                        <input type="text" className="login__container__main__input" name="username" value={this.props.username} onChange={this.props.onChangeUsername} maxLength="12" required></input>
                        <label  className="login__container__main__label">Username</label>
                        <button className="login__container__main__loginButton" onClick={this.props.onLogin}>Login</button>
                    </main>
                </div>
            </div> 
        );
    }
}

export default Login;