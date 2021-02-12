import React, { useState } from 'react'
import axios from 'axios'


const ProductForm = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const submit = async(evt) => {
    evt.preventDefault();
    const product = await axios.post('api/products', {name, price});
    props.history.push('/home');
}

  return (
      <div>
    <h1>Create a new product!</h1>
    <form onSubmit={submit}>
      <div>
        <label htmlFor="name">Product Name</label>
        <input value={name} onChange={(evt)=>setName(evt.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="price">Product Price</label>
        <input value={price} onChange={(evt)=>setPrice(evt.target.value)}type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default ProductForm

