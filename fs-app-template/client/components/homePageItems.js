import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, fetchProducts } from "../store";

class HomePageItems extends React.Component {
  async componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.props.homepageitems;
    return (
      <div>
        {products.length ?
              products.map((product) => {
                return (
                    <div key = {product.id}>
                        <img src={product.thumbnailImgUrl}></img>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                    </div>
                );
              })
         : (
          <h1>No Items</h1>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => state;

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(HomePageItems);
