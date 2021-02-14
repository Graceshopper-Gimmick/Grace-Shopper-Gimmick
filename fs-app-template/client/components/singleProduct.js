import React from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addProduct } from "../store/cart";
import { withStyles } from "@material-ui/core/styles";
import { Card, Button, Box } from "@material-ui/core";

const styles = (theme) => ({
  homePageItemsContainer: {
    background: "#ffd149", //amber light
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

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

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    const product = this.props.singleProduct;
    const userId = this.props.auth.id;
    const quantity = 1;
    const { classes, theme } = this.props;
    return (
      <Card
        className={classes.myCustomClass}
        padding={theme.spacing(4)}
        variant="outlined"
      >
        {this.props.singleProduct ? (
          <div>
            <h1>{product.name}</h1>
            <br />
            <Box
              className={classes.imgThumbnail}
              border={1}
              borderColor="black"
            >
              <img src={product.thumbnailImgUrl} />
            </Box>
            <br />
            <h2>Description: </h2>
            <h4>{product.description}</h4>
            <br />
            <h2>Category: </h2>
            <h3>{product.category}</h3>
            <br />
            <h3>Price: {product.price}</h3>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                this.props.addProduct(product.id, userId, quantity)
              }
            >
              Add to Cart
            </Button>{" "}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </Card>
    );
  }
}

// Will need to build out; this is just starter code
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchtoProps = {
  fetchProduct,
  addProduct,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchtoProps)(SingleProduct)
);
