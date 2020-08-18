import React, { useState } from 'react';
import FacebookLoginBtn from 'react-facebook-login'
import { Link } from 'react-router-dom';


/**
* @author
* @function FacebookLogin
**/

const FacebookLogin = (props) => {
    const [auth, setAuth] = useState(false);

    const componentClicked = () => {
        console.log('facebook btn clicked')
        // props.history.push('/cars-catalog');

    }

    const responseFacebook = (res) => {
        setAuth(true)
        console.log(res)

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