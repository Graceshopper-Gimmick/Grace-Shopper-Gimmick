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

class Cart extends React.Component {
    componentDidMount() {
        this.props.getCartItems()
    }

    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(ev) {
        const change = {}
        change[ev.target.name] = ev.target.value //targets Select Target By Name to change value
        this.setState(change)
        // console.log(change)
    }

    // TODO : MAKE SURE CART COMPONENT RENDERS ON REFRESH

    render() {
        console.log(this.props)

        const { classes, theme } = this.props
        const { quantity } = this.state
        const { handleChange } = this

        const cartProducts = this.props.cart.length
            ? this.props.cart[0].orders.filter(
                  (order) => order.product !== null
              )
            : []

        console.log(
            'cartID',
            this.props.cart.length ? this.props.cart[0].id : 'nothing'
        )

        console.log('AUTH_ID', this.props.auth.id)
        return (
            <FormControl>
                <h1>Welcome, to the cart {this.props.auth.email}</h1>
                {cartProducts.length ? (
                    cartProducts.map((order) => {
                        return (
                            <FormControl
                                variant="filled"
                                className={classes.cartFormControl}
                                key={order.product.id}
                            >
                                <InputLabel htmlFor="filled-age-native-simple">
                                    Quantity
                                </InputLabel>
                                <Select
                                    native
                                    value={this.state.value}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: `${order.product.id}-quantity`, //dynamically assing name based on productId
                                        id: 'filled-age-native-simple',
                                    }}
                                    className={classes.quantity}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </Select>

                                <img src={order.product.thumbnailImgUrl}></img>
                                <h2> {order.product.name}</h2>
                                <p>Price: ${order.product.price}</p>
                                <Button
                                    onClick={() =>
                                        this.props.deleteCartItem(
                                            this.props.cart[0].id,
                                            order.product.id,
                                            this.props.auth.id
                                        )
                                    }
                                >
                                    <RemoveShoppingCartIcon />
                                </Button>
                            </FormControl>
                        )
                    })
                ) : (
                    <h1>No Items</h1>
                )}
                <Button color="inherit" href="/checkout">
                    Submit
                </Button>
            </FormControl>
        )
    }
}

const mapState = (state) => state

const mapDispatch = (dispatch) => {
    return {
        getCartItems: () => dispatch(getCartItems()),
        deleteCartItem: (cartId, cartItemId, userId) =>
            dispatch(deleteCartItem(cartId, cartItemId, userId)),
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(mapState, mapDispatch)(Cart)
)
