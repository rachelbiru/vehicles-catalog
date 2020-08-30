import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, Paper, Avatar, Button, FormControl } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from './FacebookLogin';
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
            marginTop: '5%',
            marginLeft: 'auto',
            marginRight: '36%'
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
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#c45336',
        border: '2px solid #c45336',
       '&:hover': {
              backgroundColor: '#bc6752',
              color: 'white',
              border: '#bc6752'
            },
       
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

    const onSubmit = data => {
        const user = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        axios.post('users/register', {
            name: user.name,
            email: user.email,
            password: user.password,
        })
            .then(res => {
                if (res.status === 200) {
                    alert('A name was submitted: ' + data.name);
                    console.log(res)
                    history.push('login');

                } else {

                }

            }).catch(() => {
                alert('The Email Not Valid Try Another');
                console.log('some erorr')
            })
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
                        <div class="form__group field">
                            <input
                                type="input"
                                class="form__field"
                                placeholder="Name"
                                name="name"
                                id='name'
                                ref={register}
                            />
                            <label for="name" class="form__label">Name</label>
                        </div>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <div class="form__group field">
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="input"
                                class="form__field"
                                placeholder="Email"
                                name="email"
                                id='email'
                                ref={register({
                                    required: "Enter your e-mail",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                      message: "Enter a valid e-mail address",
                                    },
                                })}
                                autoComplete="off"
                                autoFocus
                                required
                            />
                            <label for="email" class="form__label">Email</label>
                        </div>
                    </FormControl>
                    {errors.email && <p>{errors.email.message}</p>}
                    <FormControl margin="normal" required fullWidth>
                        <div class="form__group field">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password"
                                class="form__field"
                                placeholder="Password"
                                name="password"
                                id='password'
                                ref={register({ required: "PASSWORD REQUIRED", minLength: { value: 8, message: "Too Short, the min it's 8" } })}
                                autoComplete="off"
                            />
                            <label for="password" class="form__label">Password</label>
                        </div>
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
                  <div class="hr-sect">OR</div>

                    <FacebookLogin sendToken={sendTokenFacebookLogin} />
                </form>
            </Paper>
        </main>

    )

}

export default withStyles(styles)(Register)