import React from 'react'
import { connect } from 'react-redux'
import { getCartItems } from '../store/cart'
import { fetchProducts } from '../store/homePageItems'
import { me } from '../store'
import axios from 'axios'

/**
 * COMPONENT
 */
class Cart extends React.Component {
    componentDidMount() {
        this.props.getCartItems()
    }

    // TODO : MAKE SURE CART COMPONENT RENDERS ON REFRESH

    render() {
        console.log(
            'ORDERS',
            this.props.cart.length ? this.props.cart[0].orders : 'No Cart'
        )
        const cartProducts = this.props.cart.length
            ? this.props.cart[0].orders
            : []
        return (
            <div>
                <h1>Welcom, to the cart {this.props.auth.email}</h1>
                {cartProducts.length ? (
                    cartProducts.map((order) => {
                        return (
                            <div key={order.product.id}>
                                <img src={order.product.thumbnailImgUrl}></img>
                                <h2> {order.product.name}</h2>
                                <p>${order.product.price}</p>
                            </div>
                        )
                    })
                ) : (
                    <h1>No Items</h1>
                )}
            </div>
        )
    }
}

const mapState = (state) => state

const mapDispatch = (dispatch) => {
    return {
        getCartItems: () => dispatch(getCartItems()),
    }
}

export default connect(mapState, mapDispatch)(Cart)
