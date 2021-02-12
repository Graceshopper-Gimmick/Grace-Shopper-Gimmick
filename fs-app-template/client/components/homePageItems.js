import * as React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout, fetchProducts } from "../store";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, Button, Box } from "@material-ui/core";
import { withRouter } from "react-router";
import { addProduct } from "../store/cart";

const styles = (theme) => ({
<<<<<<< HEAD
  homePageItemsContainer: {
    background: "#ffd149", //amber light
    display: "flex",
    justifyContent: "space-evenly",
  },
=======
    homePageItemsContainer: {
        background: '#ffd149', //amber light
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
>>>>>>> 816cbd5fee9d3695dec841543d9ad7a27d34937b

  myCustomClass: {
    maxWidth: 275,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 1,
    margin: "30px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    fontFamily: "Bitter",
    minWidth: 250,
    color: "black",
  },

  imgThumbnail: {
    maxWidth: 160,
    maxHeight: 160,
  },
});

class HomePageItems extends React.Component {
<<<<<<< HEAD
  async componentDidMount() {
    this.props.getProducts();
  }
=======
    async componentDidMount() {
        await this.props.getProducts()
    }
>>>>>>> 816cbd5fee9d3695dec841543d9ad7a27d34937b

  render() {
    const products = this.props.homepageitems;
    const { addProduct } = this.props;
    const { classes, theme } = this.props;

<<<<<<< HEAD
    const userId = this.props.auth.id; // replace this with Auth.ID
    console.log(userId);
    const quantity = 1; // can change based off of dropdown from cart menu?
    console.log(this.props);
=======
        const userId = this.props.auth.id // replace this with Auth.ID
        //console.log(userId)
        const quantity = 1 // can change based off of dropdown from cart menu?
        //console.log(this.props)
>>>>>>> 816cbd5fee9d3695dec841543d9ad7a27d34937b

    return (
      <div className={classes.homePageItemsContainer}>
        {products.length ? (
          products.map((product) => {
            return (
              <Card
                className={classes.myCustomClass}
                padding={theme.spacing(4)}
                key={product.id}
                variant="outlined"
              >
                <Box
                  className={classes.imgThumbnail}
                  border={1}
                  borderColor="black"
                >
                  <img
                    className={classes.imgThumbnail}
                    src={product.thumbnailImgUrl}
                  ></img>
                </Box>
                <Link to={`/home/${product.id}`}>
                  <h2> {product.name}</h2>
                </Link>
                <p>${product.price}</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => addProduct(product.id, userId, quantity)}
                >
                  Add to Cart
                </Button>
              </Card>
            );
          })
        ) : (
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

<<<<<<< HEAD
const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    addProduct: (productId, userId, quantity) =>
      dispatch(addProduct(productId, userId, quantity)),
  };
};
=======
const mapDispatch = {
        getProducts: fetchProducts,
        addProduct
    }

>>>>>>> 816cbd5fee9d3695dec841543d9ad7a27d34937b

export default withStyles(styles, { withTheme: true })(
  connect(mapState, mapDispatch)(HomePageItems)
);
