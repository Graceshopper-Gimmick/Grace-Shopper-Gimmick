import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  productCard: {
      margin: theme.spacing(1),
      minWidth: 120,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 300,
      alignItems: 'center',
      textAlign: 'center',
  },

  centered: {
      width: '50vw',
      height: '82vh',

      position: 'absolute',
      top: '70px',
      bottom: '0',
      left: '0',
      right: '0',

      margin: 'auto',
  },
})

class UpdateProduct extends React.Component{
constructor(props){
    super(props)
    this.state = {
        name: this.props.product?this.props.product.name:'',
        price: this.props.product?this.props.product.price:0,
        category: this.props.product?this.props.product.category:'',
        quantity: this.props.product?this.props.product.quantity:0,
        ogImgUrl: this.props.product?this.props.product.ogImageUrl:'',
        thumbnailImgUrl: this.props.product?this.props.product.thumbnailImgUrl:''
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

async submit(evt){
    evt.preventDefault();
    const product = await axios.put(`/api/products/admin/${this.props.match.params.id*1}`,this.state);
    this.props.history.push('/admin');
  }

async handleChange(evt){
this.setState({
    [evt.target.name]:evt.target.value
})
}

  render(){
    const {submit,handleChange} = this
    const {name,price,quantity,ogImgUrl,thumbnailImgUrl,category} = this.state
    const { classes, theme } = this.props
  return (
      <div id="updateProduct">
        <Paper style={{overflow:"scroll"}} className={`${classes.productCard} ${classes.centered}`}>
    <form onSubmit={submit}>        
        <TextField style={{ marginTop:'2rem' }} label="Product Name" id="outlined-basic" variant="outlined" name="name" value={name} onChange={(evt)=>handleChange(evt)} />
        <TextField label="Product Price" id="outlined-basic" variant="outlined" name='price' value={price} onChange={(evt)=>handleChange(evt)} />
        <TextField label="Product Category" id="outlined-basic" variant="outlined" name='category' value={category} onChange={(evt)=>handleChange(evt)} />
        <TextField label="Large Image" id="outlined-basic" variant="outlined" name='ogImgUrl' value={ogImgUrl} onChange={(evt)=>handleChange(evt)} />
        <TextField label="Small Image" id="outlined-basic" variant="outlined" name='thumbnailImgUrl' value={thumbnailImgUrl} onChange={(evt)=>handleChange(evt)} />
        <TextField label="Product Quantity" id="outlined-basic" variant="outlined" name='quantity' value={quantity} onChange={(evt)=>handleChange(evt)} />
        <Button color="primary" variant="contained" type="submit">Update </Button>
    </form>
    </Paper>
    </div>
  )
  }

}

const mapState = (state,otherProps) => {
    const product = state.homepageitems.find(product=>product.id===otherProps.match.params.id*1) || {}
    return {
        product
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapState)(UpdateProduct))
