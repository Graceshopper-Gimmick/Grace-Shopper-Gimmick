import React from "react";
import { connect } from "react-redux";
import { getCartItems } from "../store/cart";
import { fetchProducts } from '../store/homePageItems'
import { me } from "../store";
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
    const allProducts = this.props.homepageitems
    //console.log("Render",this.props);
    //console.log(this.props.cart.length?this.props.cart[0].orders:'false')
    console.log('ORDERS',this.props.cart.length?this.props.cart[0].orders:'No Cart')
    const cartItemIds = this.props.cart.length?this.props.cart[0].orders.map(product=>product.productId):[]
    const cartProducts = allProducts.filter(product=>cartItemIds.includes(product.id))
    console.log(cartProducts)
    //this.props.cart[0].length?console.log("Render",this.props.cart[0][orders]):null;
    return (
      <div>
        <h1>Welcome, to the cart {this.props.auth.email}</h1>
        {cartProducts.length ? (
                    cartProducts.map((product) => {
                        return (
                            <div>
                                <h2> {product.name}</h2>
                                <p>${product.price}</p>
                            </div>
                        )
                    })
                ) : (
                    <h1>No Items</h1>
                )}
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getCartItems: () => dispatch(getCartItems())
  };
};

export default connect(mapState, mapDispatch)(Cart)

