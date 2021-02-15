import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { removeProduct } from '../store/cart'
import ProductForm from './ProductForm'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UpdateProduct from './UpdateProduct'




class AdminView extends React.Component {
    async componentDidMount() {
        await this.props.getProducts();
    }
    
    render() {
        const products = this.props.homepageitems;
        const { removeProduct, updateProduct } = this.props
        const { history } = this.props
        return (
            <div>             
                <ProductForm history={history} />
                {products.length ? (
                    products.map(product => {
                        return (
                            <div key={product.id}>
                                <h2>{product.name}</h2>
                                <img src={product.thumbnailImgUrl}></img>
                                <p>{product.price}</p>
                                <button onClick={() =>
                                        removeProduct(product.id)
                                    }>x</button>
                                <button><Link to={`/admin/update/${product.id}`}>Edit Item</Link></button>
                            </div>
                        )
                    })
                ) : (
                    <h1>No Products</h1>
                )}
            </div>
        )
    }
}

const mapState = (state) => state

const mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts()),
        removeProduct: (productId) => dispatch(removeProduct(productId)),
        updateProduct: (productId) => console.log(productId)
    }
}

export default connect(mapState, mapDispatch)(AdminView)
