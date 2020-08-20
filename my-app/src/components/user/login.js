
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, avatar } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10),
            alignItems: 'center'
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
            
        },

    }),
);

/**
* @author
* @function Login
**/


const Login = (props) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);

    const handleLogin = () => {
        const user = {
            email,
            password,
        }

        axios
            .post('users/login', {
                email: user.email,
                password: user.password,
            })
            .then(res => {
                if (res.status === 404) {
                    console.log("some error")
                    setIsError(true)
                }
                else {
                    console.log(res.data)
                    props.history.push('/cars-catalog');
                }
            })
            .catch(err => {
                console.log(err);
                setIsError(true)
            })
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };

    return (

        <React.Fragment>

            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Hello Guest!
               </Typography>
                    {/* <CardHeader className={classes.header} title="Login App" /> */}
                    <CardContent>
                        <div>
                            <TextField
                                // error={error}
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e)}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e)}
                            />
                        </div>
                    </CardContent>
                    {isError ? <p style={{color:"red"}}>Login error</p> : ''}
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.loginBtn}
                            onClick={() => handleLogin()}
                            disabled={isButtonDisabled}>
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.loginBtn}
                            component={Link}
                            to="/register">
                            Go back to Register
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </React.Fragment>
    )

}

export default Login