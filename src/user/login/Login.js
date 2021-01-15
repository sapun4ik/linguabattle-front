import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, VK_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import vkLogo from '../../img/vk-logo.png';
import Alert from 'react-s-alert';

class Login extends Component {
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Вход в LinguaBattle</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">или</span>
                    </div>
                    <LoginForm {...this.props} />
                    <span className="signup-link">Новый пользователь? <Link to="/signup">Регистрация!</Link></span>
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Вход с Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Вход с Facebook</a>
                <a className="btn btn-block social-btn vk" href={VK_AUTH_URL}>
                    <img src={vkLogo} alt="vk" /> Вход с VK</a>
            </div>
        );
    }
}


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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

        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            Alert.success("You're successfully logged in!");
            this.props.history.push("/");
        }).catch(error => {
            Alert.error((error && error.message) || 'Ой! Что-то пошло не так. Пожалуйста, попробуйте еще раз!');
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="usernameOrEmail" 
                        className="form-control" placeholder="Nickname or Email"
                        value={this.state.usernameOrEmail} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Погнали!</button>
                </div>
            </form>                    
        );
    }
}

export default Login
