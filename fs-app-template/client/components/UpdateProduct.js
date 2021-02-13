import React, { useState } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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
        <input name='name' value={name} onChange={(evt)=>handleChange(evt)} />
      </div>
      <div>
        <label>Product Price</label>
        <input name='price' value={price} onChange={(evt)=>handleChange(evt)}/>
      </div>
      <div>
        <label>Product Category</label>
        <input name='category' value={category} onChange={(evt)=>handleChange(evt)}/>
      </div>
      <div>
        <label>Product Original Image URL</label>
        <input name='ogImgUrl' value={ogImgUrl} onChange={(evt)=>handleChange(evt)}/>
      </div>
      <div>
        <label>Product Thumbnail URL</label>
        <input name='thumbnailImgUrl' value={thumbnailImgUrl} onChange={(evt)=>handleChange(evt)}/>
      </div>
      <div>
        <label>Product Quantity</label>
        <input name='quantity' value={quantity} onChange={(evt)=>handleChange(evt)}/>
      </div>
      <button type="submit">Update</button>
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

