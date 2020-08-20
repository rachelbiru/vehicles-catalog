import React, { useState } from 'react';
import FacebookLoginBtn from 'react-facebook-login'
import axios from 'axios';
import FB from 'fb';

/**
* @author
* @function FacebookLogin
**/

const FacebookLogin = (props) => {
    const [auth, setAuth] = useState(false);

    const componentClicked = () => {
        console.log('facebook btn clicked')
    }

    const responseFacebook = (response) => {
        console.log(response)
        const { accessToken, userID } = response

        axios.post('users/login-with-facebook',
                JSON.stringify({ accessToken, userID }), {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => {
                if (res.status === 200) {
                    console.log("facebook Login Success")
                } else {
                    console.log('post facebook user data not success')
                }
            }).catch(() => {
                console.log('some erorr')
            })

            FB.api( '/me/access_token',
                'GET',
                {"fields":"id,name"},
                function(response) {
                    console.log(JSON.stringify(response))
                }
              );

    }

    let facebookData;

    auth ?
        facebookData = (
            console.log("no accuses")
        ) :
        facebookData = (
            <FacebookLoginBtn
                appId="629937194617880"
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />
        )

    return (
        <div>
            {facebookData}
        </div>
    )

}

export default FacebookLogin