import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store'
import { withStyles } from '@material-ui/core/styles'
import { Card, Button, Box } from '@material-ui/core'
import { addProduct } from '../store/cart'


const styles = () => ({
    homePageItemsContainer: {
        background: '#ffd149', //amber light
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },

    myCustomClass: {
        maxWidth: 275,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 1,
        margin: '30px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontFamily: 'Bitter',
        minWidth: 250,
        color: 'black',
    },

    imgThumbnail: {
        maxWidth: 160,
        maxHeight: 160,
    },
})

class HomePageItems extends React.Component {
    constructor(){
        super()
        this.state = {
            category:'All'
        }
    }
    async componentDidMount() {
        this.props.getProducts()
    }

    render() {
        let products = this.props.homepageitems
        products = products.length?products.filter(product=>product.category):[]
        const { addProduct } = this.props
        const { classes, theme } = this.props


        const userId = this.props.auth.id // replace this with Auth.ID
        console.log(userId)
        const quantity = 1 // can change based off of dropdown from cart menu?
        console.log(this.props)


    return (
      <div className={classes.homePageItemsContainer}>
        {products.length ? (
          products.map((product) => {
            return (
              <Link to={`/home/${product.id}`} key={product.id}>
              <Card
                className={classes.myCustomClass}
                padding={theme.spacing(4)}
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
                  <h2> {product.name}</h2>
                <p>${product.price}</p>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => addProduct(product.id, userId, quantity)}
                >
                  Add to Cart
                </Button>
              </Card>
              </Link>
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
const mapState = (state) => state

const mapDispatch = {
    getProducts: fetchProducts,
    addProduct,
}

export default withStyles(styles, { withTheme: true })(
    connect(mapState, mapDispatch)(HomePageItems)
)
