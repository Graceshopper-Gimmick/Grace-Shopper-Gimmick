import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },

//     appBar: {
//         background: '#ffa000', // amber 700 primary
//     },
// }))
const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    root: {
        display: 'flex',
        // position: 'static',
        // alignItems: 'unset',
    },

    appBar: {
        // display: 'flex',
        height: '72px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    shoppingCart: {
        paddingTop: '6px',
        fontSize: '30px',
    },
    navButtons: {
        marginTop:'16px'
    }
}))

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                id="appbar"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar id="toolbar" className="toolbar">
                    <IconButton
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        color="inherit"
                        aria-label="open-drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
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
                                <div id="login-div" className = {classes.navButtons}>
                                    {/* The navbar will show these links after you log in */}
                                    <Button color = 'inherit' href="/cart" id="shopping-cart">
                                        <ShoppingCartIcon
                                            className={classes.shoppingCart}
                                        />
                                    </Button>
                                    {isAdmin ? (
                                        <Button color = 'inherit' href="/admin">Admin</Button>
                                    ) : null}
                                    <Button color = 'inherit' href="/home">Home</Button>
                                    <Link to = "/guest" style={{color:'white',textDecoration:'none'}}><Button color = 'inherit' onClick={handleClick}>
                                        Logout
                                    </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className = {classes.navButtons}>
                                    {/* The navbar will show these links before you log in */}
                                    <Button color = 'inherit' href="/cart" id="shopping-cart">
                                        <ShoppingCartIcon
                                            className={classes.shoppingCart}
                                        />
                                    </Button>
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
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    {['Profile', 'Purchases'].map((text, index) => (
                        <Link to={`/${text}`} key={index}>
                            {' '}
                            <ListItem
                                button
                                key={text}
                                onClick={handleDrawerClose}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id,
        isAdmin: !!state.auth.isAdmin,
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
