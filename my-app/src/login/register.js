import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class Register extends Component {
    state = {firstName:'',lastName:'', email: '', password: '',confirmPassword:'', signIn: false }

    register = async () => {


        const res = await axios.post('/register',
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                confirmPassword : this.state.confirmPassword
            })
            console.log(res,'wbeufwiefowjfw');
            this.setState({ flag: true })
    }
    render() {
        if (this.state.signIn) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <video autoPlay muted loop id="myVideo">
                    <source src="https://player.vimeo.com/external/230853032.hd.mp4?s=05832b10d5382b3ed1ae9d915654f565e04e0d34&profile_id=174" type="video/mp4" />
                </video>
                <div className="loginpanel">
                    <div className="txt">
                        <input id="user" type="text" placeholder="First Name" />
                        <label for="user" className="entypo-user"></label>
                    </div>
                    <div className="txt">
                        <input id="user" type="text" placeholder="Last Name" />
                        <label for="user" className="entypo-user"></label>
                    </div>
                    <div className="txt">
                        <input id="user" type="email" placeholder="Email" />
                        <label for="user" className="entypo-user"></label>
                    </div>
                    <div className="txt">
                        <input id="pwd" type="password" placeholder="Password" />
                        <label for="pwd" className="entypo-lock"></label>
                    </div>
                    <div className="txt">
                        <input id="pwd" type="password" placeholder="Confirm Password" />
                        <label for="pwd" className="entypo-lock"></label>
                    </div>
                    <div className="buttons">
                        <input type="button" value="Login" />
                        <span>
                            <a href="" className="entypo-user-add register" onClick={() => {
                                this.setState({ signIn: true })
                            }}>Login</a>
                        </span>
                    </div>

                </div>
            </div>

        );
    }
}

export default Register;