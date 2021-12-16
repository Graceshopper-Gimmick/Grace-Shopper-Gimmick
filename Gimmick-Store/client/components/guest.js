import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const styles = (theme) => ({
    guestCard: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        alignItems: 'center',
        textAlign: 'center',
    },

    centered: {
        width: '25vw',
        height: '25vh',

        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',

        margin: 'auto',
    },
})

class Guest extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes, theme } = this.props

        return (
            <div id="guest">
                <Paper className={`${classes.guestCard} ${classes.centered}`}>
                    <h1>Welcome</h1>
                    {/* <Link> */}
                        <Button
                        href = '/home'
                            onClick={() => {
                                window.localStorage.setItem('user', 'guest')
                            }}
                            
                        > Continue as Guest
                        </Button>
                    {/* </Link> */}
                    <Link to="/signup">
                        <Button>
                            Sign Up
                        </Button>
                    </Link>
                    <Link to="/login">
                    <Button>
                        Login
                    </Button>
                    </Link>
                </Paper>
            </div>
        )
    }
}

const mapState = (state) => state

export default withStyles(styles, { withTheme: true })(connect(mapState)(Guest))
