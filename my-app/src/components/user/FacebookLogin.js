import React, { useState } from 'react';
import FacebookLoginBtn from 'react-facebook-login'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './facebookStyle.css';

/**
* @author
* @function FacebookLogin
**/

const FacebookLogin = (props) => {
    const [auth, setAuth] = useState(false);
    const [accessToken, setAccessToken] = useState(false);
    const history = useHistory();

    const componentClicked = () => {
        console.log('facebook btn clicked')
    }

    const responseFacebook = (response) => {
        setAccessToken(response.accessToken)
        const { accessToken, userID } = response

        axios.post('/users/login-with-facebook',
            JSON.stringify({ accessToken, userID }), {
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("facebook Login Success")
                    props.sendToken(accessToken)
                    setAuth(true)
                    history.push('cars-catalog')
                    localStorage.setItem('token', accessToken)

                } else {
                    console.log('post facebook user data not success')
                }
            }).catch(() => {
                console.log('some error')
            })
    }



    const facebookData = (
        <FacebookLoginBtn
            appId="629937194617880"
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"
            cssClass="loginFacebook"
            textButton = "&nbsp;&nbsp;Sign In with Facebook"                                                                

        />
    )

    return (
        <div>
            {facebookData}
        </div>

    )

}

export default FacebookLogin