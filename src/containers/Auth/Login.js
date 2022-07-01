import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLogin(this.state.username, this.state.password);
            console.log(data);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user);
                console.log('Login successfully!!!');
            }
        } catch (error) {
            if(error.response)
            {
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('vghz', error.response);
        }
        
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-center login-text">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your username"
                                onChange = {(event) => { this.handleOnChangeUsername(event)}}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? "text" : "password"} 
                                    className="form-control" 
                                    placeholder="Enter your password"
                                    onChange = {(event) => { this.handleOnchangePassword(event)}}
                                />
                                <span onClick = {() => {this.handleShowHidePassword()}}>
                                     <i className={this.state.isShowPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye" }></i>
                                </span>
                                
                            </div>
                               
                        </div>
                        <div className="col-12" style={{color: "red"}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button 
                                className="btn-login"
                                onClick = {() => {this.handleLogin()}}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Login
                                </button>
                        </div>
                        <div className="col-12 forgot-password">
                            Forgot your password ?
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span>or Login with:</span>
                            <div className="col-12 social-login">
                                <i className="fa-brands fa-google-plus-g icon-google"></i>
                                <i className="fa-brands fa-facebook icon-facebook"></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
