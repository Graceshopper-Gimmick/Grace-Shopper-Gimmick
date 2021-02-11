import React from "react";
import { connect } from "react-redux";
import fetchProduct from "../store";
// If we want to add a Link back to all products page.
// Can use Link to wrap the product name on all products page to this component as well.
import { Link } from "react-router-dom";

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
    console.log('steve test', this.props)
  }

  render() {
    const product = this.props.product;
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
          {/* We don't have descriptions yet <p>{product.description}</p> */}
        </h3>
        <br />
        <h3>Price: {product.price}</h3>
      </div>
    );
  }
}

// Will need to build out; this is just starter code
const mapStateToProps = (state) => ({
    product: state.product
});

const mapDispatchtoProps = {
    fetchProduct
};

export default connect(mapStateToProps, mapDispatchtoProps)(SingleProduct);
