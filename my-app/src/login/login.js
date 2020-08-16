import React, { Component } from 'react';
import './login.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class Login extends Component {
    state={email:'', password:'',signUp:false}

    login=()=>{
        axios.get('/login')
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        if (this.state.signUp) {
            return<Redirect to='/register'/>
        }
        return (
            <div>
                <video autoPlay muted loop id="myVideo">
                    <source src="https://player.vimeo.com/external/230853032.hd.mp4?s=05832b10d5382b3ed1ae9d915654f565e04e0d34&profile_id=174" type="video/mp4" />
                </video>
                <div className="loginpanel">
                    <div className="txt">
                        <input id="user" type="email" placeholder="Email" />
                        <label for="user" className="entypo-user"></label>
                    </div>
                    <div className="txt">
                        <input id="pwd" type="password" placeholder="Password" />
                        <label for="pwd" className="entypo-lock"></label>
                    </div>
                    <div className="buttons">
                        <input type="button" value="Login" />
                        <span>
                            <a href="register" className="entypo-user-add register" onClick={()=>{
                            this.setState({signUp:true})
                            }}>Register</a>
                        </span>
                    </div>

                    <div className="hr">
                        <div></div>
                        <div>OR</div>
                        <div></div>
                    </div>

                    <div className="social">
                        <a href="" className="facebook"></a>
                        <a href="" className="twitter"></a>
                        <a href="" className="googleplus"></a>
                    </div>
                </div>

                <span className="resp-info"></span>
            </div>
        );
    }
}

export default Login;