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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class HomePageItems extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "All",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    this.props.getProducts();
  }
  handleChange(event) {
    const category = event.target.value;
    this.setState(() => {
      return { category: category };
    });
  }
  render() {
    let products = this.props.homepageitems;
    if (products.length) {
      if (this.state.category === 'All') {
        products = products.filter((product) => product.category)
      } else {
        products = products.filter((product) => product.category === this.state.category)
      }
    }
    const { addProduct } = this.props;
    const { classes, theme } = this.props;

    const userId = this.props.auth.id; // replace this with Auth.ID
    const quantity = 1; // can change based off of dropdown from cart menu?

    return (
      <div>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Category</InputLabel>
          <Select
            native
            value={this.state.category}
            onChange={this.handleChange}
            inputProps={{
              id: "filled-age-native-simple",
            }}
          >
            <option aria-label="None" value="All">All</option>
            <option value="Culinary">Culinary</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Star Wars">Star Wars</option>
            <option value="Gag Gifts">Gag Gifts</option>
            <option value="Apparel">Apparel</option>
          </Select>
        </FormControl>
        <div className={classes.homePageItemsContainer}>
          {products.length ? (
            products.map((product) => {
              return (
                  <Card
                    className={classes.myCustomClass}
                    padding={theme.spacing(4)}
                    variant="outlined"
                    key={product.id}
                  >
                    <Link to={`/home/${product.id}`}>
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
                    <h2> {product.name}</h2>
                    <p>${product.price}</p>
                    </Link>
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
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => state;

const mapDispatch = {
  getProducts: fetchProducts,
  addProduct,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapState, mapDispatch)(HomePageItems)
);
