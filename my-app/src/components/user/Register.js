
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import FacebookLoginBtn from 'react-facebook-login'
import axios from 'axios';



const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px `
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
})


/**
* @author
* @function Register

**/

const Register = (props) => {

    const { classes } = props
    const { register, handleSubmit, errors } = useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);

    const onSubmit = data => {
        alert('A name was submitted: ' + data.name);
        const user = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        axios
            .post('users/register', {
                name: user.name,
                email: user.email,
                password: user.password,
            })
            .then(res => {
                if (res.status === 200){
                    console.log(res)
                    props.history.push('/login');
                } else {

                }
           
            }).catch(() => {
                console.log('some erorr')
            })
    }

    const componentClicked = () => {
        console.log('facebook btn clicked')

    }

    const responseFacebook = (res) => {
        console.log(res)
        setAuth(true)
        props.history.push('/cars-catalog');


    }

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Hello Guest!
               </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl margin="normal" required fullWidth>
                        <input

                            id="name"
                            name="name"
                            placeholder="Name"
                            autoComplete="off"
                            ref={register}
                            autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <input onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" placeholder="Email" type="email" autoComplete="off" ref={register} autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={register({ required: "PASSWORD REQUIRED", minLength: { value: 8, message: "Too Short, the min it's 8" } })}
                            autoComplete="off" />
                    </FormControl>
                    {errors.password && <p>{errors.password.message}</p>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isButtonDisabled}
                        className={classes.submit}>
                        Register
                 </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/login"
                        className={classes.submit}>
                        Go back to Login
                  </Button>

                    <FacebookLoginBtn
                        appId="629937194617880"
                        autoLoad={false}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook} />

                </form>
            </Paper>
        </main>

    )

}

export default withStyles(styles)(Register)
