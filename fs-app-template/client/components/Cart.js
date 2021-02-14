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
            cartTotal: 0,
        }

        // this.handleChange = this.handleChange.bind(this)
        this.updateCheckoutTotal = this.updateCheckoutTotal.bind(this)
        // this.setItemQuantities = this.setItemQuantities.bind(this)
    }

    // handleChange(ev) {
    //     const change = {}
    //     change[ev.target.name] = ev.target.value //targets Select Target By Name to change value dynamically change state name quantity to item
    //     this.setState(change)
    //     console.log('state after set', this.state)
    // }
    // setItemQuantities(productId) {
    //     console.log(productId)
    //     // var e = document.getElementById(`cart-item-${productId}`)
    //     // let itemQuantity = e.value
    //     if (productId) {
    //         this.setState({ [`${productId}-quantity`]: 1 })
    //         console.log(this.state)
    //     }
    // }

    updateCheckoutTotal(productId, productPrice) {
        var e = document.getElementById(`cart-item-${productId}`)
        let itemQuantity = e.value
        // console.log.bind(itemQuantity_Price)
        this.setState(
            {
                [`${productId}-quantity-price`]: [
                    itemQuantity * 1,
                    productPrice,
                ],
            },
            () => this.calculateTotal()
        )
        // because state is asynchrnous need callback
        // this.setState({ [`${productId}-price`]: productPrice * 1 }, () =>
        //     this.calculateTotal()
        // )

        //update total based on item quantity/id and item price
        console.log('regular log', this.state)
    }

    calculateTotal() {
        let cartIdObj = this.state
        delete cartIdObj.cartTotal
        let newTotal = 0
        console.log('obj', cartIdObj)

        for (let id in cartIdObj) {
            newTotal += cartIdObj[id][0] * (cartIdObj[id][1] * 1) // put price quantity in array object
            this.setState({ cartTotal: newTotal })
            console.log('newTotal', newTotal)
        }

        console.log('setState', this.state)
    }

    // TODO : MAKE SURE CART COMPONENT RENDERS ON REFRESH

    render() {
        const { classes, theme } = this.props
        const { quantity } = this.state
        const { handleChange, updateCheckoutTotal, setItemQuantities } = this
        let cartTotal = 0

        const cartProducts = this.props.cart.length
            ? this.props.cart[0].orders.filter(
                  (order) => order.product !== null
              )
            : []

        return (
            <FormControl>
                <h1>Welcome, to the cart {this.props.auth.email}</h1>
                {cartProducts.length ? (
                    cartProducts.map((order) => {
                        // setItemQuantities(order.product.id)
                        // this.state.cartTotal += order.product.price * 1
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
                                    // onChange={handleChange}
                                    onChange={() =>
                                        updateCheckoutTotal(
                                            order.product.id,
                                            order.product.price
                                        )
                                    }
                                    inputProps={{
                                        name: `${order.product.id}-quantity`, //dynamically assigning name based on productId
                                        id: `cart-item-${order.product.id}`,
                                    }}
                                    className={classes.quantity}
                                >
                                    <option aria-label="None" value="1" />
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
                <h1>Total Price: ${this.state.cartTotal.toFixed(2)}</h1>
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
