import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, VK_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import vkLogo from '../../img/vk-logo.png';
import Alert from 'react-s-alert';

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Зарегистрироваться в LinguaBattle</h1>
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text">или</span>
                    </div>
                    <SignupForm {...this.props} />
                    <span className="login-link">Уже есть аккаунт? <Link to="/login">Вход!</Link></span>
                </div>
            </div>
        );
    }
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="social-signup">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Регистрация с Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Регистрация с Facebook</a>
                <a className="btn btn-block social-btn vk" href={VK_AUTH_URL}>
                    <img src={vkLogo} alt="VK" /> Регистрация с VK</a>
            </div>
        );
    }
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success("Вы успешно зарегистрировались. Пожалуйста, залогиньтесь для продолжения!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Ой! Что-то пошло не так. Пожалуйста, попробуйте еще раз!');            
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name" 
                        className="form-control" placeholder="Name"
                        value={this.state.name} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="username" 
                        className="form-control" placeholder="Nickname"
                        value={this.state.username} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Регистрация</button>
                </div>
            </form>                    

        );
    }
}

export default Signup