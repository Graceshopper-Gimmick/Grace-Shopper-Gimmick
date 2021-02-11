import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { removeProduct } from '../store/cart'
import ProductForm from './ProductForm'
import axios from 'axios'




class AdminView extends React.Component {
    async componentDidMount() {
        await this.props.getProducts();
    }
    async submit(newProduct){
        const product = await axios.post('api/products', newProduct);
    }
    render() {
        const products = this.props.homepageitems;
        const { removeProduct } = this.props
        return (
            <div>             
                <ProductForm onSubmit={this.submit} />
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
        removeProduct: (productId) =>
            dispatch(removeProduct(productId)),
    }
}

export default connect(mapState, mapDispatch)(AdminView)
