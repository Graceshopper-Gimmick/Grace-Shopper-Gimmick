import React, { useState } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { getCartItems, deleteCartItem, submitCart } from '../store/cart'
import { fetchProducts } from '../store/homePageItems'
import { me } from '../store'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'



const styles = (theme) => ({
    card: {
        // minWidth:1000,
        // maxHeight:200,
        margin: 16,
        // backgroundColor:'#fcd734'
    },
    cartFormControl: {
        margin: theme.spacing(1),
        //minWidth: 120,
        minWidth: '80vw',
        maxHeight: 200,
        display: 'flex',
        //maxWidth: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: '#fcd734',
        backgroundColor: 'white',
        //border:'solid 10px #0d47a1',
    },

    image: {
        width: 160,
        height: 160,
        margin: 10,
        border: 'solid 4px black',
    },

    select: {
        maxWidth: 75,
        maxHeight: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    heading: {
        margin: '16px 0 0 32px',
        fontSize: 48,
    },
    submit: {
        maxWidth: 50,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    productName: {
        flexGrow: 4,
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    quantityContainer: {
        marginTop: '-50px',
    },
})

class Cart extends React.Component {
    async componentDidMount() {
        await this.props.getCartItems()
        // console.log(this.props)

        await this.setInitialTotal()
        //function that gets all product ids on pages (set initial price)
        //set state of (ids-quantity-price)
    }

    
    constructor(props) {
        super(props)
        this.state = {
            cartTotal: 0,
        }

        this.updateCheckoutTotal = this.updateCheckoutTotal.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
        this.makePayment = this.makePayment.bind(this)
    }

    setInitialTotal() {
        console.log('SET INITIAL_TOTAL')
        console.log('PROP', this.props)
        const { cart } = this.props

        //call the select values

        cart[0].orders.map((cartItem) => {
            // var select = document.getElementById(`cart-item-${cartItem.product.id}`)
            // let itemQuantity = select.value

            this.updateCheckoutTotal(
                cartItem.product.id,
                cartItem.product.price
            )
        })
    }

    updateCheckoutTotal(productId, productPrice) {
        var e = document.getElementById(`cart-item-${productId}`)
        let itemQuantity = e.value
        this.setState(
            {
                [`${productId}-quantity-price`]: [
                    itemQuantity * 1,
                    productPrice,
                ],
            },
            () => this.calculateTotal(false, productId)
        )
    }

    calculateTotal(onDelete, productId) {
        // console.log('onDelete', onDelete)
        let cartIdObj = this.state
        delete cartIdObj.cartTotal
        let newTotal = 0
        // console.log('obj', cartIdObj)

        if (onDelete) {
            delete cartIdObj[`${productId}-quantity-price`]
        }

        for (let id in cartIdObj) {
            newTotal += cartIdObj[id][0] * (cartIdObj[id][1] * 1) // put price quantity in array object
            this.setState({ cartTotal: newTotal })
            console.log('newTotal', newTotal)
        }

        console.log('setState', this.state)
    }


    async changeQuantity(cartId, productId) {
        var e = document.getElementById(`cart-item-${productId}`)
        let quantity = e.value
        console.log('VALUES', cartId, productId, quantity)
        // console.log('STATE', this.state)
        const updatedOrder = await axios.put('/api/order/', {
            cartId,
            productId,
            quantity,
        })
        
    }

   

    async makePayment(token, cartId){
        console.log(cartId);
        console.log("TOKEN", token)
        const response = await axios.post('/auth/payment', { token, cartTotal:this.state.cartTotal });
        const { status } = response.data
        if(status === "success"){
            console.log("CARTID", cartId);
            this.props.submitCart(cartId);
            this.props.history.push('/checkout')
        } else {
            alert("purchase didn't go through");
        }
    }   

    

    render() {
        const selectValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const { classes, theme, submitCart } = this.props
        const { updateCheckoutTotal, changeQuantity } = this
        console.log('RENDER', this.props)

        const cartProducts = this.props.cart.length
            ? this.props.cart[0].orders.filter((order) => order.product)
            : []

        console.log('CARTPRODCTS', cartProducts)

        const cartId = this.props.cart.length ? this.props.cart[0].id : 0
        const userId = this.props.auth ? this.props.auth.id : 0


        return (
            <FormControl id='cart'>
                <div>
                    <h1 className={classes.heading}>CART ITEMS</h1>
                </div>
                {cartProducts.length ? (
                    cartProducts.map((order) => {
                        // setItemQuantities(order.product.id)
                        // this.state.cartTotal += order.product.price * 1
                        return (
                            <Card className={classes.card}>
                                <FormControl
                                    variant="filled"
                                    className={classes.cartFormControl}
                                    key={order.product.id}
                                >
                                    <div>
                                        <img
                                            className={classes.image}
                                            src={order.product.thumbnailImgUrl}
                                        ></img>
                                    </div>

                                    <div className={classes.quantityContainer}>
                                        <p
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                textAlign: 'left',
                                            }}
                                        >
                                            Quantity
                                        </p>
                                        <Select
                                            native
                                            value={this.state.value}
                                            // onChange={handleChange}
                                            onChange={() => {
                                                updateCheckoutTotal(
                                                    order.product.id,
                                                    order.product.price
                                                )
                                                changeQuantity(
                                                    cartId,
                                                    order.product.id
                                                )
                                            }}
                                            inputProps={{
                                                name: `${order.product.id}-quantity`, //dynamically assigning name based on productId
                                                id: `cart-item-${order.product.id}`,
                                            }}
                                            className={classes.quantity}
                                        >
                                            {/* <option aria-label="1" value={1} /> */}
                                            {selectValues.map(
                                                (selectOption) => {
                                                    return (
                                                        <option
                                                            value={selectOption}
                                                            selected={
                                                                selectOption ===
                                                                order.quantity
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {selectOption}
                                                        </option>
                                                    )
                                                }
                                            )}
                                        </Select>
                                    </div>
                                    <div className={classes.productName}>
                                        <p
                                            style={{
                                                fontSize: '72px',
                                                fontFamily: 'Luckiest Guy',
                                            }}
                                            className="itemTitle"
                                        >
                                            {' '}
                                            {order.product.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontSize: '48px',
                                                color: 'green',
                                            }}
                                        >
                                            ${order.product.price}
                                        </p>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            this.props.deleteCartItem(
                                                this.props.cart[0].id,
                                                order.product.id,
                                                this.props.auth.id
                                            )
                                            this.calculateTotal(
                                                true,
                                                order.product.id
                                            )
                                        }}
                                    >
                                        <RemoveShoppingCartIcon />
                                    </Button>
                                </FormControl>
                            </Card>
                        )
                    })
                ) : (
                    <h1>No Items</h1>
                )}
                <h1 style={{ textAlign: 'right' }} className={classes.heading}>
                    Total Price: $
                    {this.state.cartTotal
                        ? this.state.cartTotal.toFixed(2)
                        : '0.00'}
                </h1>
                <div className={classes.buttonContainer}>
                    
                    <StripeCheckout 
                    stripeKey="pk_test_51IMjVXJQEuzpjUNSiPnojSVFeAcX5Xoz5TOP13CuUmvQyiQS7XdzrY5zpi2gvV4WN2mM3CSDxAG5TFXGYdnZMN3C00nreQg538"
                    token={(token) => this.makePayment(token, cartId)}
                    amount={this.state.cartTotal ? this.state.cartTotal.toFixed(2) * 100 : 0}
                    >
                    </StripeCheckout>
                    <Button
                        onClick={() => {
                            //console.log('CARTID', cartId)
                            this.props.submitCart(cartId)
                        }}
                        color="primary"
                        size="large"
                        variant="contained"

                        className={classes.submit}                        

            //            className={classes.submit}
           //             href="/checkout"

                    >
                        Submit
                    </Button>
                </div>
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
        submitCart: (cartId) => dispatch(submitCart(cartId)),
    }
}

export default withStyles(styles, { withTheme: true })(
    connect(mapState, mapDispatch)(Cart)
)
