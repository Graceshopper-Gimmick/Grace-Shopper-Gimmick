import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        background: '#ffa000', // amber 700 primary
    },
}))

const Navbar = ({ handleClick, isLoggedIn }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <p className="navbar-title">
                            Gimme' Your Money Gimmicks
                        </p>
                    </Typography>
                    <div>
                        <nav>
                            {isLoggedIn ? (
                                <div>
                                    {/* The navbar will show these links after you log in */}
                                    <Link to="/home">Home</Link>
                                    <a href="#" onClick={handleClick}>
                                        Logout
                                    </a>
                                </div>
                            ) : (
                                <div>
                                    {/* The navbar will show these links before you log in */}
                                    <Button color="inherit" href="/login">
                                        Login
                                    </Button>
                                    <Button color="inherit" href="/signup">
                                        Sign Up
                                    </Button>
                                    <Button color="inherit" href="/home">
                                        Home
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                </Toolbar>
            </AppBar>
        </div>

        // <div className={classes.root}>
        //
        //     <nav>
        //         {isLoggedIn ? (
        //             <div>
        //                 {/* The navbar will show these links after you log in */}
        //                 <Link to="/home">Home</Link>
        //                 <a href="#" onClick={handleClick}>
        //                     Logout
        //                 </a>
        //             </div>
        //         ) : (
        //             <div>
        //                 {/* The navbar will show these links before you log in */}
        //                 <Link to="/login">Login</Link>
        //                 <Link to="/signup">Sign Up</Link>
        //             </div>
        //         )}
        //     </nav>
        //     <hr />
        // </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id,
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout())
        },
    }
}

export default connect(mapState, mapDispatch)(Navbar)
