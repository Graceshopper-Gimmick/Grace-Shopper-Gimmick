import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

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
            <Paper className={`${classes.guestCard} ${classes.centered}`}>
                <h1>Welcome</h1>
                <Button
                    onClick={() => {
                        console.log('Create Guest')
                    }}
                >
                    Continue as Guest
                </Button>
                <Button>
                    <a href="/signup">Sign Up</a>
                </Button>
                <Button>
                    <a href="login">Login</a>
                </Button>
            </Paper>
        )
    }
}

const mapState = (state) => state

export default withStyles(styles, { withTheme: true })(connect(mapState)(Guest))