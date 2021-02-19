import React, { useState } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { FormControl, Input } from '@material-ui/core';
import { Button } from '@material-ui/core'

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
  return (
      <div>
    <form onSubmit={submit}>
      <div>
        <label>Product Name</label>
        <Input name='name' value={name} onChange={(evt)=>handleChange(evt)}  inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label>Product Price</label>
        <Input name='price' value={price} onChange={(evt)=>handleChange(evt)} inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label>Product Category</label>
        <Input name='category' value={category} onChange={(evt)=>handleChange(evt)} inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label>Product Original Image URL</label>
        <Input name='ogImgUrl' value={ogImgUrl} onChange={(evt)=>handleChange(evt)} inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label>Product Thumbnail URL</label>
        <Input name='thumbnailImgUrl' value={thumbnailImgUrl} onChange={(evt)=>handleChange(evt)} inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label>Product Quantity</label>
        <Input name='quantity' value={quantity} onChange={(evt)=>handleChange(evt)} inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <Button color="primary" variant="contained" type="submit">Update </Button>
    </form>
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

export default connect(mapState)(UpdateProduct)

