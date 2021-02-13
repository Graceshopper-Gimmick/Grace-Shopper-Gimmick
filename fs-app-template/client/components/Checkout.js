import React from 'react'
import { connect } from 'react-redux'
import { getCartItems, deleteCartItem } from '../store/cart'
import { fetchProducts } from '../store/homePageItems'
import { me } from '../store'
import axios from 'axios'

import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

const styles = (theme) => ({
    cartFormControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        display: 'flex',
        maxWidth: 200,
    },

    imgThumbnail: {
        maxWidth: 160,
        maxHeight: 160,
    },

    quantity: {
        maxWidth: 100,
    },
})

class Checkout extends React.Component {
    componentDidMount() {
        // this.props.getCartItems()
    }

    constructor(props) {
        super(props)
        // this.state = {
        //     quantity: 1,
        // }
        // this.handleChange = this.handleChange.bind(this)
    }

    // handleChange(ev) {
    //     const change = {}
    //     change[ev.target.name] = ev.target.value //targets Select Target By Name to change value
    //     this.setState(change)
    //     console.log(change)
    // }

    // TODO : MAKE SURE CART COMPONENT RENDERS ON REFRESH

    render() {
        // const { classes, theme } = this.props
        // const { quantity } = this.state
        // const { handleChange } = this

        // const cartProducts = this.props.cart.length
        //     ? this.props.cart[0].orders
        //     : []

        return <h1>Thank you for your purchase</h1>
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
