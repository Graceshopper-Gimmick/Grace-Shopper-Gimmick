import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { Button } from "@material-ui/core";
import {addProduct} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    console.log("steve test", this.props);
  }

  render() {
    const product = this.props.singleProduct;
    const userId = this.props.auth.id;
    const quantity = 1;
    return (
      <div>
        <h1>{product.name}</h1>
        <br />
        <div>
          <img src={product.thumbnailImgUrl} />
        </div>
        <br />
        <h3>Description: </h3>
        <br />
        <h3>Price: {product.price}</h3>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => addProduct(product.id, userId, quantity)}
        >Add to Cart</Button>
      </div>
    );
  }
}

// Will need to build out; this is just starter code
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchtoProps = {
  fetchProduct,
};

export default connect(mapStateToProps, mapDispatchtoProps)(SingleProduct);
