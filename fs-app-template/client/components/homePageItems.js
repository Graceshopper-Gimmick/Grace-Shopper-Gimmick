import * as React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { logout, fetchProducts } from '../store'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Card, Button, Box, Paper } from '@material-ui/core'
import { withRouter } from 'react-router'
import { addProduct } from '../store/cart'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AutoPlay from './Banner.js'
import { green } from '@material-ui/core/colors'

const styles = (theme) => ({
    homePageItemsContainer: {
        // background: '#ffd149', //amber light

        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgb(254, 206, 0)'

        // background: #DCE35B;  /* fallback for old browsers */
        // background: -webkit-linear-gradient(to right, #45B649, #DCE35B);  /* Chrome 10-25, Safari 5.1-6 */
        //background:
        //   'linear-gradient(to right, #45B649, #DCE35B)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    },

    myCustomClass: {
        maxWidth: 275,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: '30px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        fontFamily: 'Bitter',
        minWidth: 250,
        backgroundColor:'#ffac1c'
    },

    imgThumbnail: {
        width: '160',
        height: '160',
        borderColor: 'black',
        objectFit: 'cover',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 18px 0 rgba(0,0,0,0.3)',
        },
    },

    formBackground: {
        width: '100vw',
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '4.5rem',
        backgroundColor: 'rgb(254, 206, 0)'
        //background: 'linear-gradient(to right, #45B649, #DCE35B)',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    productLink: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})

class HomePageItems extends React.Component {
    constructor() {
        super()
        this.state = {
            category: 'All',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
        this.props.getProducts()
    }
    handleChange(event) {
        const category = event.target.value
        this.setState(() => {
            return { category: category }
        })
    }
    render() {
        let products = this.props.homepageitems
        if (products.length) {
            if (this.state.category === 'All') {
                products = products.filter((product) => product.category)
            } else {
                products = products.filter(
                    (product) => product.category === this.state.category
                )
            }
        }
        const { addProduct } = this.props
        const { classes, theme } = this.props

        const userId = this.props.auth.id // replace this with Auth.ID
        const quantity = 1 // can change based off of dropdown from cart menu?

        return (
            <div>
                <AutoPlay />
                <div className={classes.formBackground}>
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                    >
                        <InputLabel htmlFor="filled-age-native-simple">
                            Category
                        </InputLabel>
                        <Select
                            native
                            value={this.state.category}
                            onChange={this.handleChange}
                            inputProps={{
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="All">
                                All
                            </option>
                            <option value="Culinary">Culinary</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Star Wars">Star Wars</option>
                            <option value="Gag Gifts">Gag Gifts</option>
                            <option value="Apparel">Apparel</option>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.homePageItemsContainer}>
                    {products.length ? (
                        products.map((product) => {
                            return (
                                <Paper
                                    className={classes.myCustomClass}
                                    padding={theme.spacing(4)}
                                    key={product.id}
                                    elevation={3}
                                >
                                    <Link
                                        className={classes.productLink}
                                        to={`/home/${product.id}`}
                                        style={{textDecoration:'none'}}
                                    >
                                        <img
                                            className={classes.imgThumbnail}
                                            src={product.thumbnailImgUrl}
                                            border={'3px'}
                                        ></img>

                                        <h2 style={{fontFamily:'Luckiest Guy',color:'white',WebkitTextStroke:'1px black'}}> {product.name}</h2>
                                        <p style={{fontFamily:'Luckiest Guy',fontSize:'20px',color:'black'}}>${product.price}</p>
                                    </Link>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            addProduct(
                                                product.id,
                                                userId,
                                                quantity
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </Button>
                                </Paper>
                            )
                        })
                    ) : (
                        <h1>No Items</h1>
                    )}
                </div>
            </div>
        )
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
