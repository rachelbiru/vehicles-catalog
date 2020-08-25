import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 6,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: '44%',
            position: 'relative',
            marginTop: '17%'
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `10px ${theme.spacing(8.375)}px`,
        backgroundColor: '#dd9f4082',
        width: '100%',
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
* @function HomePage
**/

const HomePage = (props) => {
    const { classes } = props
    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Hello Guest!
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
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
                    login
                </Button>
            </Paper>

        </main>
    )

}

export default withStyles(styles)(HomePage)