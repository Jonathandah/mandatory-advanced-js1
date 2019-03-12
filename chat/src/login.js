import React, { Component } from 'react';
import "./login.css";
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            mail: "funkar",
        }
    }
    render(){
        return(
            <div className="login">
                <div className="login__container">
                    <header className="login__container__header">
                        <p className="login__container__header__text">Login</p>
                    </header>
                    <main className="login__container__main">
                        <div className="login__container__main__box">
                            <p className="login__container__main__box__errorMessage">{this.props.inputError}</p>
                        </div>
                        <div className="login__container__main__box">
                            <input type="text" className="login__container__main__box__input" name="username" value={this.props.username} onChange={this.props.onChangeUsername} minLength="1" maxLength="12" placeholder="Username" required></input>
                            <button className="login__container__main__box__loginButton" onClick={this.props.onLogin}>Login</button>
                        </div>

                    </main>
                </div>
            </div> 
        );
    }
}

export default Login;