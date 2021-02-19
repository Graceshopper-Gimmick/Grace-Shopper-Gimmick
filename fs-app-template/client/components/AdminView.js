import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { removeProduct } from '../store/cart'
import ProductForm from './ProductForm'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));


class AdminView extends React.Component {
    async componentDidMount() {
        await this.props.getProducts();
    }
    

    render() {
        const products = this.props.homepageitems;
        const { removeProduct, updateProduct } = this.props
        const { history, classes, theme } = this.props
        return (
            <div id="adminView">             
                <ProductForm history={history} />
                {products.length ? (
                    products.map(product => {
                        return (
                            <div key={product.id}>
                                <h2>{product.name}</h2>
                                <img src={product.thumbnailImgUrl}></img>
                                <p>{product.price}</p>
                                <Button variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                onClick={() =>
                                removeProduct(product.id)}>
                                    Delete
                                </Button>

                                <Button                             
                                    variant="contained"                                
                                    className={classes.button}
                                    startIcon={<EditIcon />}
                                ><Link to={`/admin/update/${product.id}`}>Edit Item</Link></Button>
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

export default withStyles(useStyles, {withTheme:true})(connect(mapState, mapDispatch)(AdminView))
