import React from "react";
import { connect } from "react-redux";
import {fetchProduct} from "../store/singleProduct";
// If we want to add a Link back to all products page.
// Can use Link to wrap the product name on all products page to this component as well.
import { Link } from "react-router-dom";

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    console.log('steve test', this.props)
  }

  render() {
    const product = this.props.singleProduct;
    return (
      <div>
        <h1>{product.name}</h1>
        <br />
        <div>
          <img src={product.ogImgUrl} />
        </div>
        <br />
        <h3>
          Description:{" "}
        </h3>
        <br />
        <h3>Price: {product.price}</h3>
      </div>
    );
  }
}

// Will need to build out; this is just starter code
const mapStateToProps = (state) => {
    //product: state.product
    console.log(state)
    return state;
};

const mapDispatchtoProps = {
    fetchProduct
};

export default connect(mapStateToProps, mapDispatchtoProps)(SingleProduct);
