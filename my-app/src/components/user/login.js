
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Avatar, Button, FormControl} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from './FacebookLogin';
import './facebookStyle.css';
import './register.css';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: '30%',
            position: 'relative',
            marginTop: '10%',
            marginLeft: 'auto',
            marginRight: '37%'
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `10px ${theme.spacing(8.375)}px`,
        backgroundColor: '#dd9f4082',
        position: 'relative',
        color: 'white',
    },

    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#c45336',
        border: '2px solid'
    },
    loginBtn: {
        marginTop: theme.spacing(2),
            flexGrow: 1,
        backgroundColor: '#c45336',
        border: '2px solid #c45336',
        width: '100%',
       '&:hover': {
              backgroundColor: '#bc6752',
              color: 'white',
              border: '#bc6752'
            },
       
    }


})

/**
* @author
* @function Login
**/


const Login = (props) => {
    // const classes = useStyles();
    const { classes } = props

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState('')

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isError, setIsError] = useState(false);

    const history = useHistory()


    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);


    const sendTokenFacebookLogin = (token) => {
        props.getToken(token)
    }

    const handleLogin = () => {
        const user = {
            email,
            password,
        }

        axios.post('users/login', {
            email: user.email,
            password: user.password,
        })
            .then(res => {
                if (res.status === 404) {
                    console.log("some error")
                    setIsError(true)
                }
                else {
                    props.getToken(res.data.token)
                    setLogin(true)
                    history.push('cars-catalog')
                    localStorage.setItem('token', res.data.token)


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
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Hello Guest!
           </Typography>

                


                    <FormControl margin="normal" required fullWidth>
                        <div class="form__group field">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                fullWidth
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Email"
                                margin="normal"
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e)}
                                class="form__field"

                            />
                            <label for="email" class="form__label">Email</label>
                        </div>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <div class="form__group field">
                            <input
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e)}
                                class="form__field"
                            />
                            <label for="password" class="form__label">Password</label>
                        </div>
                    </FormControl>
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
                    <div class="hr-sect">OR</div>

                    <FacebookLogin sendToken={sendTokenFacebookLogin} />
            </Paper>
        </main>
    )

}

export default withStyles(styles)(Login)