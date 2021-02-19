import React, { useState } from 'react'
import axios from 'axios'
import { FormControl, Input } from '@material-ui/core';
import { Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const ProductForm = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnailImgUrl, setImgUrl] = useState('');
  const [category, setCategory] = useState('');
  const submit = async(evt) => {
    evt.preventDefault();
    const product = await axios.post('api/products', {name, price, category, thumbnailImgUrl});
    props.history.push('/home');
}

  return (
      <div>
    <h1>Create a new product!</h1>
    <form onSubmit={submit}>
      <div>
        <label htmlFor="name">Product Name</label>
        <Input value={name} onChange={(evt)=>setName(evt.target.value)} type="text" inputProps={{ 'aria-label': 'description' }}/>
      </div>
      <div>
        <label htmlFor="price">Product Price</label>
        <Input value={price} onChange={(evt)=>setPrice(evt.target.value)}type="text" inputProps={{ 'aria-label': 'description' }} />
      </div>
      <div>
        <label htmlFor="price">Product Category</label>
        <Input value={category} onChange={(evt)=>setCategory(evt.target.value)}type="text" inputProps={{ 'aria-label': 'description' }} />
      </div>
      <div>
        <label htmlFor="thumbnailImgUrl">Product Image</label>
        <Input value={thumbnailImgUrl} onChange={(evt)=>setImgUrl(evt.target.value)}type="text" inputProps={{ 'aria-label': 'description' }} />
      </div>
      <Button color="primary" startIcon={<SaveIcon />} variant="contained" type="submit">Create </Button>
    </form>
    </div>
  )
}

export default ProductForm

