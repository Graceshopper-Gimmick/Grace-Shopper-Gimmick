import React from 'react'
import { connect } from 'react-redux'
import { getCartItems, deleteCartItem } from '../store/cart'
import { fetchProducts } from '../store/homePageItems'
import { me } from '../store'
import axios from 'axios'

import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { Paper } from '@material-ui/core'

const styles = (theme) => ({
    checkIcon: {
        fontSize: '100px',
        color: 'green',
    },

    thankYou: {
        width: '50vw',
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15vh',
    },

    checkoutContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgb(254, 206, 0)',
    },
})

class Checkout extends React.Component {
    render() {
        const { classes, theme } = this.props
        return (
            <div className={classes.checkoutContainer}>
                <Paper className={classes.thankYou}>
                    <CheckCircleOutlineIcon className={classes.checkIcon} />
                    <h1 style={{ textAlign: 'center' }}>
                        Thank you for your purchase
                    </h1>
                    <h2>Yoda approves this purchase...</h2>
                    <Paper>
                        <img
                            src="assets/background-imgs/yoda-chanel-centered.jpeg"
                            width="200"
                            height="200"
                        ></img>
                    </Paper>
                </Paper>
            </div>
        )
    }
}

const mapState = (state) => state

const mapDispatch = (dispatch) => {
    return {
        getCartItems: () => dispatch(getCartItems()),
        deleteCartItem: (id) => dispatch(deleteCartItem(id)),
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(mapState, mapDispatch)(Checkout)
)
