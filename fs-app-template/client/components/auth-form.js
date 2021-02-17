import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
/**
 * COMPONENT
 */

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        minWidth: 100,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 200,
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    centered: {
        width: '30vw',
        height: '25vh',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto',
        padding: '1rem',
    },
}))

export default function AuthForm(props) {
    const { name, displayName, handleSubmit, error } = props
    const classes = useStyles()

    return (
        <Paper className={`${classes.root} ${classes.centered}`}>
            <form onSubmit={handleSubmit} name={name}>
                <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    type="text"
                />

                <TextField
                    id="standard-basic"
                    label="Password"
                    name="password"
                    type="password"
                />

                <Button type="submit">{displayName}</Button>

                {error && error.response && <div> {error.response.data} </div>}
            </form>
            {window.githubURL && (
                <a href={window.githubURL}>Login / Register Via Github </a>
            )}
        </Paper>
    )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
    return {
        name: 'login',
        displayName: 'Login',
        error: state.auth.error,
    }
}

const mapSignup = (state) => {
    return {
        name: 'signup',
        displayName: 'Sign Up',
        error: state.auth.error,
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            const formName = evt.target.name
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(authenticate(email, password, formName))
        },
    }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
