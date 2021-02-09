import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store';
import {Link} from 'react-router-dom';

export class SingleProduct extends React.Component {
    componentDidMount(){
        //this.props.fetchProduct(this.props.match.params.id);
    }

    render() {
        const product = this.props.product;
        return (
            <div>
                <h1>{product.name}</h1>
                <br/>
                <div>
                    <img src={product.ogImgUrl} />
                </div>
                <br />
                <h3>Description:</h3>
                {/* We don't have descriptions yet <p>{product.description}</p> */}
                <br />
                <h3>{product.price}</h3>
            </div>
        )
    }
}

const mapState = {state} => ({
    product: state.product
});
